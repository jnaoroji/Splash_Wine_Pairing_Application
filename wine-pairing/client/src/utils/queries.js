import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      username
      email
      password
      pairing {
        _id
        category
        protein
        sauce
      }
      wine {
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
        comments {
          _id
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
`;

export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      username
      email
      pairing {
        _id
        category
        protein
        sauce
      }
      wine {
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
        comments {
          _id
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
`;

export const QUERY_PROTEINS = gql`
  query getProteins {
    proteins {
      _id
      name
      value
    }
  }
`;

export const QUERY_SAUCES = gql`
  query getSauces {
    sauces {
      _id
      name
      value
    }
  }
`;

export const QUERY_USER_WINES = gql`
  query getUserWines($username: String) {
    wines(username: $username) {
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
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_WINE = gql`
  query getSingleWine($wineId: ID!) {
    getSingleWine(wineId: $wineId) {
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
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_PAIRING = gql`
  query getPairing($searchProtein: String!, $searchSauce: String!) {
    getPairing(searchProtein: $searchProtein, searchSauce: $searchSauce) {
      pairingId
      wines {
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
  }
`;

export const QUERY_PAIRING_BY_ID = gql`
  query getPairingById($pairingId: ID!) {
    pairing(pairingId: $pairingId) {
      _id
      category
      protein
      sauce
    }
  }
`;

export const QUERY_GET_PAIRING_ID = gql`
  query getPairingId($searchProtein: String!, $searchSauce: String!) {
    getPairingId(searchProtein: $searchProtein, searchSauce: $searchSauce) {
      _id
      category
      protein
      sauce
    }
  }
`;

export const USER_PAIRINGS = gql`
  query userPairings($username: String) {
    userPairings(username: $username) {
      _id
      category
      protein
      sauce
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      pairing {
        _id
        category
        protein
        sauce
      }
      wine {
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
        comments {
          _id
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
`;
