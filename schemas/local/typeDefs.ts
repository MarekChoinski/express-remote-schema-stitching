import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    publicQuery: String
    secureQuery1: String!
    secureQuery2: String!
    accessLog: String!
  }
`;
