import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./GameCreationForm.scss";

import { CREATE_GAME, GAMES_LIST_QUERY } from "../games.graphql";

const GameCreationForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [createGame] = useMutation(CREATE_GAME, {
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
