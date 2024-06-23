/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: { input: any; output: any; }
};

/** Mutation to generate a new Game */
export type CreateGame = {
  __typename?: 'CreateGame';
  game: GameType;
};

/** Frame object type */
export type FrameType = {
  __typename?: 'FrameType';
  id: Scalars['ID']['output'];
  score: Scalars['Int']['output'];
};

/** Game object type */
export type GameType = {
  __typename?: 'GameType';
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  innings?: Maybe<Array<Maybe<InningType>>>;
  isHome: Scalars['Boolean']['output'];
  opponent: Scalars['String']['output'];
};

/** Inning object type */
export type InningType = {
  __typename?: 'InningType';
  bottomFrame: FrameType;
  id: Scalars['ID']['output'];
  number: Scalars['Int']['output'];
  topFrame: FrameType;
};

/** Base mutation object type */
export type Mutation = {
  __typename?: 'Mutation';
  /** Mutation to generate a new Game */
  createGame?: Maybe<CreateGame>;
  /** Mutation to update the score of a frame */
  updateScore?: Maybe<UpdateScore>;
};


/** Base mutation object type */
export type MutationCreateGameArgs = {
  isHome?: InputMaybe<Scalars['Boolean']['input']>;
  opponent?: InputMaybe<Scalars['String']['input']>;
};


/** Base mutation object type */
export type MutationUpdateScoreArgs = {
  frameId?: InputMaybe<Scalars['ID']['input']>;
  newScore?: InputMaybe<Scalars['Int']['input']>;
};

/** Base query object type */
export type Query = {
  __typename?: 'Query';
  games?: Maybe<Array<Maybe<GameType>>>;
};

/** Mutation to update the score of a frame */
export type UpdateScore = {
  __typename?: 'UpdateScore';
  frame: FrameType;
};

export type GetGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGamesQuery = { __typename?: 'Query', games?: Array<{ __typename?: 'GameType', id: string, opponent: string, isHome: boolean, date: any, innings?: Array<{ __typename?: 'InningType', number: number, topFrame: { __typename?: 'FrameType', id: string, score: number }, bottomFrame: { __typename?: 'FrameType', id: string, score: number } } | null> | null } | null> | null };

export type CreateGameMutationVariables = Exact<{
  opponent: Scalars['String']['input'];
  isHome: Scalars['Boolean']['input'];
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame?: { __typename?: 'CreateGame', game: { __typename?: 'GameType', id: string, opponent: string } } | null };

export type UpdateScoreMutationVariables = Exact<{
  frameId: Scalars['ID']['input'];
  newScore: Scalars['Int']['input'];
}>;


export type UpdateScoreMutation = { __typename?: 'Mutation', updateScore?: { __typename?: 'UpdateScore', frame: { __typename?: 'FrameType', id: string, score: number } } | null };


export const GetGamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGames"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"games"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"opponent"}},{"kind":"Field","name":{"kind":"Name","value":"isHome"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"innings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"topFrame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bottomFrame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetGamesQuery, GetGamesQueryVariables>;
export const CreateGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"opponent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isHome"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"opponent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"opponent"}}},{"kind":"Argument","name":{"kind":"Name","value":"isHome"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isHome"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"opponent"}}]}}]}}]}}]} as unknown as DocumentNode<CreateGameMutation, CreateGameMutationVariables>;
export const UpdateScoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateScore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"frameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newScore"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateScore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"frameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"frameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newScore"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newScore"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"frame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateScoreMutation, UpdateScoreMutationVariables>;