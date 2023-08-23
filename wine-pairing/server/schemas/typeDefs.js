const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
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

  type Query {
    users: [User]
    sauces: [Sauce]
    proteins: [Protein]
    user(username: String!): User
    getSingleWine(wineId: ID!): Wine
    getPairing(searchProtein: String!, searchSauce: String!): [Wine]
    me: User
    wines(username: String!): [Wine]
    userPairings(username: String): [Pairing]
    pairing(pairingId: ID!): Pairing
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPairing(username: String!, searchProtein: String!, searchSauce: String!): [Wine]
    addComment(wineId: ID!): Wine
    removeComment(wineId: ID!, commentId: ID!): Wine
    addWine(username: String!): User
    savePairing(searchProtein: String!, searchSauce: String!): User
    removePairing(pairingId: ID!): Pairing
  }
`;

module.exports = typeDefs;
