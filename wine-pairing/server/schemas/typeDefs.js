const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    searches: [Search]!
  }

  type Search {
    _id: ID
    searchProtein: String
    searchSauce: String
    createdAt: String
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
    
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Search {
    _id: ID
    searchProtein: String
    searchSauce: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
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
    thoughts(username: String): [Thought]
    searches(username: String): [Search]
    thought(thoughtId: ID!): Thought
    search(searchId: ID!): Search
    
    me: User
    getPairing(searchProtein: String!, searchSauce: String!): [Wine]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSearch(searchProtein: String!, searchSauce: String!): Search
  
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeSearch(searchId: ID!): Search
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
