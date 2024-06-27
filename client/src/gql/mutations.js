import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      status
      message
    }
  }
`;

const CLIENT_LOGIN = gql`
  mutation clientLogin($email: String!) {
    clientLogin(email: $email) {
      status
      message
      data {
        id
        name
        email
        phone
      }
    }
  }
`;

const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $status: projectStatus!
    $clientId: ID!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    ) {
      status
      message
      data {
        name
        description
        status
        id
        client {
          name
        }
      }
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      status
    }
  }
`;

const CHANGE_STATUS = gql`
  mutation changeProjectStatus($id: ID!, $status: projectEditStatus!) {
    changeProjectStatus(id: $id, status: $status) {
      status
    }
  }
`;

export { ADD_CLIENT, CLIENT_LOGIN, ADD_PROJECT, DELETE_PROJECT, CHANGE_STATUS };
