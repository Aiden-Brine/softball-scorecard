import { useQuery } from "@apollo/client";

import Game from "./Game";
import { GAMES_LIST_QUERY } from "../games.graphql";
import { GameType } from "../gql/graphql";

const GamePage = () => {
  const { loading, error, data } = useQuery(GAMES_LIST_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error : {error.message}</p>;
  }

  return data.games.map((game: GameType) => (
    <div className="gamePage">
      <Game key={game.id} game={game} />
    </div>
  ));
};

export default GamePage;
