import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
  useMutation,
} from "@apollo/client";
import "./styles.scss";
import { useRef, useEffect, useState, memo, useCallback } from "react";
import GameCreationForm from "./game_creation.tsx";
import { GAMES_LIST_QUERY, UPDATE_SCORE } from "./games.graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const TEAM_NAME = "Love Gloves";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <GameCreationForm />
        <GamePage />
      </div>
    </ApolloProvider>
  );
}

const GamePage = () => {
  const { loading, error, data } = useQuery(GAMES_LIST_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error : {error.message}</p>;
  }

  return data.games.map((game) => (
    <div className="gamePage">
      <Game key={game.id} game={game} />
    </div>
  ));
};

const Game = ({ game }) => {
  const [selectedFrameId, pleaseSetSelectedFrameId] = useState(null);
  const topTotal = game.innings.reduce(
    (total, inning) => total + inning.topFrame.score,
    0
  );
  const bottomTotal = game.innings.reduce(
    (total, inning) => total + inning.bottomFrame.score,
    0
  );
  const setSelectedFrameId = (id) => {
    pleaseSetSelectedFrameId(id);
  };

  const innings = game.innings.map((inning) => (
    <Inning
      key={inning.id}
      inning={inning}
      selectedFrameId={selectedFrameId}
      setSelectedFrameId={setSelectedFrameId}
    />
  ));
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setSelectedFrameId);

  return (
    <table className="table game table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th className="foo-bar text-center">Inning</th>
          <th className="foo text-center">
            {game.isHome ? game.opponent : TEAM_NAME}
          </th>
          <th className="foo text-center">
            {game.isHome ? TEAM_NAME : game.opponent}
          </th>
        </tr>
      </thead>
      <tbody ref={wrapperRef}>
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

const Inning = ({ inning, selectedFrameId, setSelectedFrameId }) => {
  return (
    <tr>
      <td className="text-center">{inning.number}</td>
      <Frame
        frameId={inning.topFrame.id}
        score={inning.topFrame.score}
        selectedFrameId={selectedFrameId}
        setSelectedFrameId={setSelectedFrameId}
      />
      <Frame
        frameId={inning.bottomFrame.id}
        score={inning.bottomFrame.score}
        selectedFrameId={selectedFrameId}
        setSelectedFrameId={setSelectedFrameId}
      />
    </tr>
  );
};

const Frame = ({ frameId, score, selectedFrameId, setSelectedFrameId }) => {
  console.log(`rendering ${frameId}`);
  const isSelected = selectedFrameId === frameId;
  const [updateScore, { data, loading, error }] = useMutation(UPDATE_SCORE);
  const handleClick = () => {
    setSelectedFrameId(frameId);
  };
  const handleScoreUpdate = (value) => {
    updateScore({
      variables: { frameId: frameId, newScore: score + value },
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
        <div className="score">{score}</div>
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
function useOutsideAlerter(ref, setSelectedFrameId) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSelectedFrameId(null);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setSelectedFrameId]);
}
export default App;
