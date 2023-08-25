const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    pairing: [Pairing]
    wine: [Wine]
  }

  type Pairing{
    _id: ID
    category: [ID]
    protein: ID
    sauce: ID
  }

  type Wine{
    _id:ID
    name: String!
    vintage: String
    varietal: String
    region: String
    image: String
    tastingNote: String!
    price: Float
    quantity: Int
    category: Category
    comments: [Comment]
    
  }

  type Sauce {
    _id: ID
    name: String
    value: String
  }

  type Protein {
    _id: ID
    name: String
    value: String
  }

  type Category {
    _id: ID
    name: String
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    wines: [Wine]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type PairingResult {
    pairingId: ID!
    wines: [Wine]!
  }

  type Query {
    users: [User]
    sauces: [Sauce]
    proteins: [Protein]
    user(username: String!): User
    getSingleWine(wineId: ID!): Wine
    getPairing(searchProtein: String!, searchSauce: String!): PairingResult
    me: User

    wines(username: String!): [Wine]
    userPairings(username: String): [Pairing]

    pairing(pairingId: ID!):Pairing
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPairing(pairingId: ID!, username: String!): Pairing
    addWine(wineId: ID!, username: String!): User
    addComment(wineId: ID!, commentText: String!, commentAuthor: String!): Wine
    removeComment(wineId: ID!, commentId: ID!): Wine
   
    savePairing(searchProtein: String!, searchSauce: String!): User
    addUserPairing(pairingId: ID!, username: String): User
    removePairing(pairingId: ID!): Pairing
  }
`;

module.exports = typeDefs;
