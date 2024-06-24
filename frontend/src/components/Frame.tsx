import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FrameType } from "../gql/graphql";

import { UPDATE_SCORE } from "../games.graphql";

interface FrameProps {
  frame: FrameType;
  selectedFrameId: number | null;
  setSelectedFrameId: (frameId: number | null) => void;
}

const Frame: React.FC<FrameProps> = ({
  frame,
  selectedFrameId,
  setSelectedFrameId,
}) => {
  const frameId = Number(frame.id);
  const isSelected = selectedFrameId === frameId;
  const [updateScore] = useMutation(UPDATE_SCORE);
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
          <div className="incrementer" onClick={() => handleScoreUpdate(-1)}>
            <button className="scoreChanger">
              <FontAwesomeIcon
                icon={faSquareMinus}
                className="scoreChangeIcon"
              />
            </button>
          </div>
        )}
        <div className="score">{frame.score}</div>
        {isSelected && (
          <div className="incrementer" onClick={() => handleScoreUpdate(1)}>
            <button className="scoreChanger">
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
