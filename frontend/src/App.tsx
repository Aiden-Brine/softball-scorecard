import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./App.scss";
import GameCreationForm from "./components/GameCreationForm";
import GamePage from "./components/GamePage";

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

export default App;
