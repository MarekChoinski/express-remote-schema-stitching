import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    secureQuery1: String!
    secureQuery2: String!
    accessLog: [String!]
  }
`;
