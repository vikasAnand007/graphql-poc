import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects($clientId: ID!) {
    getProjects (clientId: $clientId) {
      id
      name
      description
      status
      client {
        name
        id
      }
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($id: ID!) {
    getProject (id: $id) {
      id
      name
      description
      status
      client {
        name
        id
      }
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT };
