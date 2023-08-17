const { AuthenticationError } = require('apollo-server-express');
const { User, Thought, Search, Pairing, Wine } = require('../models');
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
    me: async (parent, {searchId}, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('searches', {searchId});
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getPairing: async(parent, {searchProtein, searchSauce}, context) => {
      const pairing = await Pairing.findOne({
        protein: searchProtein,
        sauce: searchSauce
      }).populate('category');
      console.log('Pairing: ' ,pairing);
      const wines = await Wine.find().where('category').in(
        pairing.category
      ).exec();
      console.log('Wines: ',wines);
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
    addSearch: async (parent, { searchProtein, searchSauce}, context) => {
      if (context.user) {
        const search = await Search.create({
          searchProtein,
          searchSauce
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { searches: search._id } }
        );
        console.log('Search = '+ search);
        //calculate searchPairing
        const searchPairing = winePairing(search);

        //update the search object with searchPairing
        const updatedSearch = await Search.findByIdAndUpdate(
          search._id,
          {searchPairing},
          {new:true}
        );
          
        console.log('Updated Search = '+ updatedSearch);
        
        return updatedSearch;
        
        
        //update with wine
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { searchId, commentText }, context) => {
      if (context.user) {
        return Search.findOneAndUpdate(
          { _id: searchId },
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
    // removeComment: async (parent, { thoughtId, commentId }, context) => {
    //   if (context.user) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $pull: {
    //           comments: {
    //             _id: commentId,
    //             commentAuthor: context.user.username,
    //           },
    //         },
    //       },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
  },
};

module.exports = resolvers;
