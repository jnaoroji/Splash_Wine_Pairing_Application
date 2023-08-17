import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
      searches {
        _id
        searchProtein
        searchSauce
        createdAt
        searchPairing
      }
    }
  }
`;

export const QUERY_SEARCHES = gql`
  query getSearches {
    searches {
      _id
      searchProtein
      searchSauce
      createdAt
      searchPairing
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_SEARCH = gql`
  query getSingleSearch($searchId: ID!) {
    search(searchId: $searchId) {
      _id
      searchProtein
      searchSauce
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_GETPAIRING = 
($searchProtein: String!, $searchSauce: String!) {
  getPairing(searchProtein: $searchProtein, searchSauce: $searchSauce) {
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
    }
  }
}

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      searches {
        _id
        searchProtein
        searchSauce
        createdAt
        searchPairing
      }
    }
  }
`;
