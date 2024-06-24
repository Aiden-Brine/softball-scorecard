import { useRef, useState } from "react";

import { GameType } from "../gql/graphql";
import Inning from "./Inning";
import useClickOutsideRef from "../hooks/useClickOutsideRef";
import "../styles/game.scss";

const TEAM_NAME = "Love Gloves";

interface GameProps {
  game: GameType;
}

const Game: React.FC<GameProps> = ({ game }) => {
  const ref = useRef<HTMLTableSectionElement>(null);
  const [selectedFrameId, setSelectedFrameId] = useState<number | null>(null);
  const topTotal = game.innings.reduce(
    (total, inning) => total + inning.topFrame.score,
    0
  );
  const bottomTotal = game.innings.reduce(
    (total, inning) => total + inning.bottomFrame.score,
    0
  );

  const innings = game.innings.map((inning) => (
    <Inning
      key={inning.id}
      inning={inning}
      selectedFrameId={selectedFrameId}
      setSelectedFrameId={setSelectedFrameId}
    />
  ));
  useClickOutsideRef(ref, () => setSelectedFrameId(null));

  return (
    <table className="table game table-bordered">
      <thead className="table-dark">
        <tr>
          <th className="inning-header text-center">Inning</th>
          <th className="team-header text-center">
            {game.isHome ? game.opponent : TEAM_NAME}
          </th>
          <th className="team-header text-center">
            {game.isHome ? TEAM_NAME : game.opponent}
          </th>
        </tr>
      </thead>
      <tbody ref={ref}>
        {innings}
        <tr>
          <td className="text-center">Total</td>
          <td className="text-center">{topTotal}</td>
          <td className="text-center">{bottomTotal}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Game;
