import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PAIRING = gql`
mutation Mutation($pairingId: ID!, $username: String!) {
  addPairing(pairingId: $pairingId, username: $username) {
    _id
    category
    protein
    sauce
  }
}
`;


export const ADD_USER_PAIRING = gql`
  mutation addUserPairing($username: String!, $pairingId: ID) {
    addUserPairing(username: $username, pairingId: ID) {
      pairing {
        _id
      }
    }
  }
`;

export const ADD_WINE = gql`
  mutation addWine($wineId: ID!, $username: String!) {
    addWine(wineId: $wineId, username: $username) {
      wine {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($wineId: ID!, $commentText: String!, $commentAuthor: String!) {
    addComment(wineId: $wineId, commentText: $commentText, commentAuthor: $commentAuthor) {
      _id
      comments {
        _id
        commentText
        commentAuthor
       
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
mutation removeComment($wineId: ID!, $commentId: ID!) {
  removeComment(wineId: $wineId, commentId: $commentId) {
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}
`;
