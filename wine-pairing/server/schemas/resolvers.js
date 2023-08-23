const { AuthenticationError } = require('apollo-server-express');
const { User, Pairing, Wine, Sauce, Protein } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('pairing');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('pairing');
    },
    userPairings: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Pairing.find(params);
    },
    pairing: async (parent, { pairingId }) => {
      return Pairing.findOne({ _id: pairingId });
    },
    sauces: async () => {
      return await Sauce.find({});
    },
    proteins: async () => {
      return await Protein.find({});
    },
    wines: async (parent, args, context) => {
        return User.findOne({ _id: context.user._id }).populate('wine');
    },
    getSingleWine: async (parent, { wineId }, context) => {
      return Wine.findById({_id: wineId});
    },
    me: async (parent, {searchProtein, searchSauce}, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('pairing', {searchProtein, searchSauce});
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getPairing: async(parent, {searchProtein, searchSauce}, context) => {
      const pairing = await Pairing.findOne({
        protein: searchProtein,
        sauce: searchSauce
      }).populate('category');

      const wines = await Wine.find().where('category').in(
        pairing.category
      ).exec();

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
    addPairing: async (parent, { pairingId }, context) => {
      if (context.user) {
        const pairing = await Pairing.findById({
          pairingId,
          protein: searchProtein,
          sauce: searchSauce
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pairings: pairing._id } }
        );

        return pairing;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addUserPairing: async (parent, { pairingId }, context) => {
      if (context.user) {
        const pairing = await Pairing.findById({
          _id: pairingId
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pairings: pairing._id } }
        );

        return pairing;
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
    // addPairing: async (parent, { searchProtein, searchSauce}, context) => {
    //   if (context.user) {
    //     const pairing = await Pairing.findOne({
    //       protein: searchProtein,
    //       sauce: searchSauce
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { pairings: pairing._id } }
    //     );
    //     console.log('Pairing = '+ pairing);
    //     return pairing;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
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
    removePairing: async (parent, { pairingId }, context) => {
      if (context.user) {
        const pairing = await Pairing.findOneAndDelete({
          _id: pairingId,
          
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { pairings: pairing._id } }
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
