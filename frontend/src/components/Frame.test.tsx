import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import Frame from "./Frame";
import { FrameType } from "../gql/graphql";
import { ReactNode } from "react";
import userEvent from "@testing-library/user-event";
import { UPDATE_SCORE } from "../games.graphql";

describe("Frame", () => {
  const frame: FrameType = {
    id: "3",
    score: 3,
  };

  it("should render Frame component with score", async () => {
    render(
      <MockedProvider>
        {wrapInTable(
          <Frame
            frame={frame}
            inningNumber={1}
            selectedFrameId={null}
            setSelectedFrameId={() => {}}
          />
        )}
      </MockedProvider>
    );
    expect(await screen.findByText(frame.score)).toBeInTheDocument();
  });

  it("should render buttons when selectedFrameID matches", async () => {
    render(
      <MockedProvider>
        {wrapInTable(
          <Frame
            frame={frame}
            inningNumber={1}
            selectedFrameId={Number(frame.id)}
            setSelectedFrameId={() => {}}
          />
        )}
      </MockedProvider>
    );
    screen.getByRole("button", { name: "decrementer" });
    screen.getByRole("button", { name: "incrementer" });
    screen.getByTitle("Decrement Score");
    screen.getByTitle("Increment Score");
  });

  it("should select frame when clicked", async () => {
    const user = userEvent.setup();
    const setSelectedFrameId = jest.fn();
    render(
      <MockedProvider>
        {wrapInTable(
          <Frame
            frame={frame}
            inningNumber={1}
            selectedFrameId={null}
            setSelectedFrameId={setSelectedFrameId}
          />
        )}
      </MockedProvider>
    );
    const frameElem = screen.getByRole("cell", { name: "frame" });
    await user.click(frameElem);
    expect(setSelectedFrameId).toHaveBeenCalledWith(Number(frame.id));
  });

  it("should decrement score on backend when clicked", async () => {
    const user = userEvent.setup();
    const mocks = [updateScoreResponse(frame, frame.score - 1)];
    render(
      <MockedProvider mocks={mocks}>
        {wrapInTable(
          <Frame
            frame={frame}
            inningNumber={1}
            selectedFrameId={Number(frame.id)}
            setSelectedFrameId={jest.fn()}
          />
        )}
      </MockedProvider>
    );
    const decrementer = screen.getByRole("button", { name: "decrementer" });
    await user.click(decrementer);
  });

  it("should increment score on backend when clicked", async () => {
    const user = userEvent.setup();
    const mocks = [updateScoreResponse(frame, frame.score + 1)];
    render(
      <MockedProvider mocks={mocks}>
        {wrapInTable(
          <Frame
            frame={frame}
            inningNumber={1}
            selectedFrameId={Number(frame.id)}
            setSelectedFrameId={jest.fn()}
          />
        )}
      </MockedProvider>
    );
    const incrementer = screen.getByRole("button", { name: "incrementer" });
    await user.click(incrementer);
  });

  it("should disable score decrementer when score is 0", async () => {
    frame.score = 0;
    render(
      <MockedProvider>
        {wrapInTable(
          <Frame
            frame={frame}
            inningNumber={1}
            selectedFrameId={Number(frame.id)}
            setSelectedFrameId={() => {}}
          />
        )}
      </MockedProvider>
    );
    expect(screen.getByRole("button", { name: "decrementer" })).toBeDisabled();
  });

  it("should disable score incrementer when score is max", async () => {
    frame.score = 5;
    render(
      <MockedProvider>
        {wrapInTable(
          <Frame
            frame={frame}
            inningNumber={1}
            selectedFrameId={Number(frame.id)}
            setSelectedFrameId={() => {}}
          />
        )}
      </MockedProvider>
    );
    expect(screen.getByRole("button", { name: "incrementer" })).toBeDisabled();
  });

  it("should not disable score incrementer for max in open inning", async () => {
    frame.score = 5;
    render(
      <MockedProvider>
        {wrapInTable(
          <Frame
            frame={frame}
            inningNumber={7}
            selectedFrameId={Number(frame.id)}
            setSelectedFrameId={() => {}}
          />
        )}
      </MockedProvider>
    );
    expect(
      screen.getByRole("button", { name: "incrementer" })
    ).not.toBeDisabled();
  });
});

const updateScoreResponse = (frame: FrameType, newScore: number) => {
  return {
    request: {
      query: UPDATE_SCORE,
      variables: { frameId: frame.id, newScore: newScore },
    },
    result: {
      data: {
        updateScore: {
          frame: {
            id: frame.id,
            score: newScore,
          },
        },
      },
    },
  };
};

const wrapInTable = (node: ReactNode) => {
  return (
    <table>
      <tbody>
        <tr>{node}</tr>
      </tbody>
    </table>
  );
};
