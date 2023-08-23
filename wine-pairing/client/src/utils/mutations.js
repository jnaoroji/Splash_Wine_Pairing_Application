import { gql } from '@apollo/client';

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

export const ADD_SEARCH = gql`
  mutation addSearch($searchProtein: String!, $searchSauce: String!) {
    addSearch(searchProtein: $searchProtein, searchSauce: $searchSauce) {
      _id
      searchProtein
      searchSauce
      createdAt
      
    }
  }
`;

export const ADD_PAIRING = gql`
  mutation addPairing($username: String!, $searchProtein: String!, $searchSauce: String!) {
    addPairing(username: $username, searchProtein: $searchProtein, searchSauce: $searchSauce){
      _id
      name
      vintage
      varietal
      region
      image
      tastingNote
      price
      quantity
      category {
        _id
        name
      }
    }
  }
`;



export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($wineId: ID!, $commentText: String!) {
    addComment(wineId: $wineId, commentText: $commentText) {
      _id
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
