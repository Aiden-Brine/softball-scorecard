import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FrameType } from "../gql/graphql";

import { UPDATE_SCORE } from "../games.graphql";
import "../styles/frame.scss";

const MAX_SCORE = 5;
const OPEN_INNING = 7;

interface FrameProps {
  frame: FrameType;
  inningNumber: number;
  selectedFrameId: number | null;
  setSelectedFrameId: (frameId: number | null) => void;
}

const Frame: React.FC<FrameProps> = ({
  frame,
  inningNumber,
  selectedFrameId,
  setSelectedFrameId,
}) => {
  const frameId = Number(frame.id);
  const isSelected = selectedFrameId === frameId;
  const [updateScore] = useMutation(UPDATE_SCORE);
  const scoreCapped = frame.score >= MAX_SCORE && inningNumber !== OPEN_INNING;
  const handleClick = () => {
    setSelectedFrameId(frameId);
  };
  const handleScoreUpdate = (value: number) => {
    updateScore({
      variables: { frameId: frame.id, newScore: frame.score + value },
    });
  };
  return (
    <td
      className={
        "frame-data-cell" + (isSelected ? " frame-data-cell--selected" : "")
      }
      id={isSelected ? "selected-cell" : ""}
      onClick={handleClick}
    >
      <div className={"frame" + (isSelected ? " frame--selected" : "")}>
        {isSelected && (
          <div onClick={() => handleScoreUpdate(-1)}>
            <button className="scoreChanger" disabled={frame.score === 0}>
              <FontAwesomeIcon
                icon={faSquareMinus}
                className="scoreChangeIcon"
              />
            </button>
          </div>
        )}
        <div className="score">{frame.score}</div>
        {isSelected && (
          <div onClick={() => handleScoreUpdate(1)}>
            <button className="scoreChanger" disabled={scoreCapped}>
              <FontAwesomeIcon
                icon={faSquarePlus}
                className="scoreChangeIcon"
              />
            </button>
          </div>
        )}
      </div>
    </td>
  );
};

export default Frame;
