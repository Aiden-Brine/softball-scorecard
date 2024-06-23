import { gql } from "@apollo/client";

export const GAMES_LIST_QUERY = gql`
  query GetGames {
    games {
      id
      opponent
      isHome
      date
      innings {
        number
        topFrame {
          id
          score
        }
        bottomFrame {
          id
          score
        }
      }
    }
  }
`;

export const CREATE_GAME = gql`
  mutation CreateGame($opponent: String!, $isHome: Boolean!) {
    createGame(opponent: $opponent, isHome: $isHome) {
      game {
        id
        opponent
      }
    }
  }
`;

export const UPDATE_SCORE = gql`
  mutation UpdateScore($frameId: ID!, $newScore: Int!) {
    updateScore(frameId: $frameId, newScore: $newScore) {
      frame {
        id
        score
      }
    }
  }
`;
// game {
//   id
//   innings {
//     topFrame {
//       score
//     }
//   }
// }
