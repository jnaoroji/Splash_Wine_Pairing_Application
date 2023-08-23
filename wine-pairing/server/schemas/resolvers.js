const { AuthenticationError } = require('apollo-server-express');
const { User, Thought, Search, Pairing, Wine, Sauce, Protein } = require('../models');
const { signToken } = require('../utils/auth');
// const {winePairing} = require('../utils/winePairing')

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('searches');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('searches');
    },
    searches: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Search.find(params).sort({ createdAt: -1 });
    },
    search: async (parent, { searchId }) => {
      return Search.findOne({ _id: searchId });
    },
    sauces: async () => {
      return await Sauce.find({});
    },
    proteins: async () => {
      return await Protein.find({});
    },
    wine: async (parent, { wineId }) => {
      return Wine.findOne({ _id: wineId });
    },
    me: async (parent, {searchProtein, searchSauce}, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('searches', {searchProtein, searchSauce});
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getPairing: async(parent, {searchProtein, searchSauce}, context) => {
      const pairing = await Pairing.findOne({
        protein: searchProtein,
        sauce: searchSauce
      }).populate('category');
      // console.log('Pairing: ' ,pairing);
      const wines = await Wine.find().where('category').in(
        pairing.category
      ).exec();
      // console.log('Wines: ',wines);
      return wines
    }
  },
// const records = await Model.find().where('_id').in(ids).exec();
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addWine: async (parent, { wineId }, context) => {
      if (context.user) {
        const wine = await Wine.findById({
          wineId,

        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { wines: wine._id } }
        );

        return wine;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // addThought: async (parent, { thoughtText }, context) => {
    //   if (context.user) {
    //     const thought = await Thought.create({
    //       thoughtText,
    //       thoughtAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { thoughts: thought._id } }
    //     );

    //     return thought;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    addPairing: async (parent, { searchProtein, searchSauce}, context) => {
      if (context.user) {
        const pairing = await Pairing.create({
          searchProtein,
          searchSauce
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pairings: pairing._id } }
        );
        console.log('Pairing = '+ pairing);
        return Pairing;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { wineId, commentText }, context) => {
      if (context.user) {
        return Wine.findOneAndUpdate(
          { _id: wineId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // removeThought: async (parent, { thoughtId }, context) => {
    //   if (context.user) {
    //     const thought = await Thought.findOneAndDelete({
    //       _id: thoughtId,
    //       thoughtAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { thoughts: thought._id } }
    //     );

    //     return thought;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    removeSearch: async (parent, { searchId }, context) => {
      if (context.user) {
        const search = await Search.findOneAndDelete({
          _id: searchId,
          searchAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { searches: search._id } }
        );

        return search;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { wineId, commentId }, context) => {
      if (context.user) {
        return Wine.findOneAndUpdate(
          { _id: wineId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
