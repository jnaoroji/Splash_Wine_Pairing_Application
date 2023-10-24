const { AuthenticationError } = require('apollo-server-express');
const { User, Pairing, Wine, Sauce, Protein } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('pairing', 'wine');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('pairing', 'wine');
    },
    // not working
    userPairings: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Pairing.find(params);
    },
    pairing: async (parent, { pairingId }) => {
      const pairing = await Pairing.findOne({ _id: pairingId })
        .populate('protein') // Assuming 'protein' is the field name in the Pairing schema
        .populate('sauce');  // Assuming 'sauce' is the field name in the Pairing schema
        
        // console.log('pairing', pairing);
        return pairing;
    },
    // pairing: async (parent, { pairingId }) => {
    //   return Pairing.findOne({ _id: pairingId });
    // },
    sauces: async () => {
      return await Sauce.find({});
    },
    proteins: async () => {
      return await Protein.find({});
    },
    // not working
    getUserWines: async (parent, { username }, context) => {
      if (context.user) {
        return User.findOne({ username});
      }
      return User.wine;
    },
    getUserWines: async (parent, { username }, context) => {
      try {
          // Find the user by username
          const user = await User.findOne({ username });
  
          if (!user) {
              throw new Error("User not found.");
          }
  
          // Return the 'wine' array from the user object
          return user.wine;
      } catch (error) {
          throw new Error(error.message);
      }
  },
    getSingleWine: async (parent, { wineId }, context) => {
      return Wine.findById({_id: wineId});
    },
    // check
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('pairing', 'wine');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getPairing: async(parent, {searchProtein, searchSauce}, context) => {
      const pairing = await Pairing.findOne({
        protein: searchProtein,
        sauce: searchSauce
      }).populate('category').populate('protein').populate('sauce');
   
      const wines = await Wine.find().where('category').in(
        pairing.category
      ).exec();

      // console.log('Pairing for get pairing:', pairing);
      // console.log('Wines for get pairing:', wines);
      
      return {
        pairing, 
        pairingId: pairing._id,
        category: pairing.category, // Populate the 'category' field
        protein: pairing.protein,   // Populate the 'protein' field
        sauce: pairing.sauce,       // Populate the 'sauce' field
        wines: wines,
      };
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
    //adds wine to user's saved wines
    addWine: async (parent, { wineId }, context) => {
      if (context.user) {
        // Fetch the wine along with other properties
        const wine = await Wine.findById(wineId);
        if (wine) {
          // Update the user's wine array with the entire wine object
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { wine: wine } },
            { new: true }
          ).populate('wine'); // Populate the wine field
          console.log('user', user);
          return user;
        } else {
          throw new Error('Wine not found'); // Handle the case where the wine doesn't exist
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  
    //removes wine from user's wines
    removeWine: async (parent, { wineId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              wine: {
                _id: wineId,
              },
            },
          },
          { new: true }
          
        );
        
      }
      
      throw new AuthenticationError('You need to be logged in!');
    },
 //adds the pairing to the User's saved pairings
 addPairing: async (parent, { pairingId }, context) => {
  if (context.user) {
    try {
      // Find the pairing by ID and populate the 'protein' and 'sauce' fields
      const pairing = await Pairing.findById(pairingId)
        .populate('protein')
        .populate('sauce');

      if (!pairing) {
        throw new Error("Pairing not found");
      }

      // Update the user document to add the pairing to their list
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { pairing: pairing } },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }

      console.log("Pairing saved", pairing);
      return pairing;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while saving the pairing");
    }
  }
  throw new AuthenticationError("You need to be logged in!");
},

 // addPairing: async (parent,  {pairingId} , context) => {
    //   if (context.user) {

    //     const pairing = await Pairing.findById(pairingId)
    //     .populate('protein')  // Populate the 'protein' field
    //     .populate('sauce');    // Populate the 'sauce' field
    //     // const pairing = await Pairing.findByIdAndUpdate({
    //     //   _id: pairingId,

    //     // });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { 
    //         pairing: pairing._id, 
            
    //       } }
    //     );
    //     console.log('pairing saved', pairing);
    //     return pairing;
       
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    
    //adds a comment to each wine
      addComment: async (parent, { wineId, commentText}, context) => {
      if (context.user) {
        return Wine.findOneAndUpdate(
          { _id: wineId },
          {
            $addToSet: {
              comments: { 
                commentText, 
                commentAuthor: context.user.username }
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
 //deletes comment from Single wine component
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
