import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
  useMutation,
} from "@apollo/client";
import "./game_creation.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { CREATE_GAME, GAMES_LIST_QUERY } from "./games.graphql";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface GameCreationFormInput {
  Opponent: string;
  IsHome: boolean;
}

const GameCreationForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [createGame, { data, loading, error }] = useMutation(CREATE_GAME, {
    refetchQueries: [GAMES_LIST_QUERY, "GetGames"],
  });
  return (
    <Form
      className="create-form"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        createGame({
          variables: { opponent: data.opponent, isHome: data.isHome },
        });
        reset();
      })}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Opponent Name</Form.Label>
        <Form.Control
          placeholder="Enter our opponent's name"
          {...register("opponent")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Are we the home team?"
          {...register("isHome")}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default GameCreationForm;

// <form
//   onSubmit={handleSubmit((data) => {
//     console.log(data);
//     createGame({
//       variables: { opponent: data.opponent, isHome: data.isHome },
//     });
//     reset();
//   })}
// >
//   <div className="form-group">
//     <label>
//       Opponent Name:
//       <input {...register("opponent")} />
//     </label>
//     <label>
//       Home Team:
//       <input type="checkbox" {...register("isHome")} />
//     </label>
//     <input type="submit" />
//   </div>
// </form>
