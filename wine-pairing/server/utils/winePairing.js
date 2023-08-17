const { Wine } = require('../models');
const {addSearch} = require('../schemas/resolvers');



async function winePairing(search) {
  const { searchProtein, searchSauce } = search;
  let searchPairing = ''; // Declare the variable here

  console.log('Search Protein:', searchProtein);
  console.log('Search Sauce:', searchSauce);





  if (searchProtein === 1 && searchSauce === 1){
    searchPairing = Wine.category('3','4','5','6');
  } else if (searchProtein ===1 && searchSauce ===2){
    searchPairing = Wine.category('5','6');
  } else if (searchProtein ===1 && searchSauce ===3){
    searchPairing = Wine.category('1','2','3');
  } else if (searchProtein ===1 && searchSauce === 4){
    searchPairing = Wine.category('1','2','5');
  } else if (searchProtein ===1 && searchSauce === 5){
    searchPairing = Wine.category('1','2','3','5');
  } else if (searchProtein ===2 && searchSauce === 1){
    searchPairing = Wine.category('3','4','5');
  } else if (searchProtein ===2 && searchSauce === 2){
    searchPairing = Wine.category('4','6','7');
  } else if (searchProtein ===2 && searchSauce === 3){
    searchPairing = Wine.category('1','2','3','5');
  } else if (searchProtein ===2 && searchSauce === 4){
    searchPairing = Wine.category('1','2','3','5');
  } else if (searchProtein ===2 && searchSauce === 5){
    searchPairing = Wine.category('1','2','3','5','6');
  } else if (searchProtein ===3 && searchSauce === 1){
    searchPairing = Wine.category('3','4','5','6');
  } else if (searchProtein ===3 && searchSauce === 2){
    searchPairing = Wine.category('3','4','5','6');
  } else if (searchProtein ===3 && searchSauce === 3){
    searchPairing = Wine.category('1','2','3','5');
  } else if (searchProtein ===3 && searchSauce === 4){
    searchPairing = Wine.category('2','3','5');
  } else if (searchProtein ===3 && searchSauce === 5){
    searchPairing = Wine.category('2','3','5');
  } else if (searchProtein ===4 && searchSauce === 1){
    const searchPairing = Wine.category('5','6','7');
  } else if (searchProtein ===4 && searchSauce === 2){
    const searchPairing = Wine.category('5','6','7','8');
  } else if (searchProtein ===4 && searchSauce === 3){
    const searchPairing = Wine.category('2','3','4','5');
  } else if (searchProtein ===4 && searchSauce === 4){
    const searchPairing = Wine.category('5','6','7');
  } else if (searchProtein ===4 && searchSauce === 5){
    const searchPairing = Wine.category('5','6','7');
  } else if (searchProtein ===5 && searchSauce === 1){
    const searchPairing = Wine.category('8','9');
  } else if (searchProtein ===5 && searchSauce === 2){
    const searchPairing = Wine.category('7','8','9');
  } else if (searchProtein ===5 && searchSauce === 3){
    const searchPairing = Wine.category('7','8','9');
  } else if (searchProtein ===5 && searchSauce === 4){
    const searchPairing = Wine.category('7','8','9');
  } else if (searchProtein ===5 && searchSauce === 5){
    const searchPairing = Wine.category('6','7','8','9');
  } else if (searchProtein ===6 && searchSauce === 1){
    const searchPairing = Wine.category('3','4','6','7');
  } else if (searchProtein ===6 && searchSauce === 2){
    const searchPairing = Wine.category('5','6','7');
  } else if (searchProtein ===6 && searchSauce === 3){
    const searchPairing = Wine.category('4','5','6','7');
  } else if (searchProtein ===6 && searchSauce === 4){
    const searchPairing = Wine.category('2','5','6');
  } else if (searchProtein ===6 && searchSauce === 5){
    const searchPairing = Wine.category('5','6','7');
  } else if (searchProtein ===7 && searchSauce === 1){
    const searchPairing = Wine.category('3','6');
  } else if (searchProtein ===7 && searchSauce === 2){
    const searchPairing = Wine.category('7','8');
  } else if (searchProtein ===7 && searchSauce === 3){
    const searchPairing = Wine.category('5','6','7');
  } else if (searchProtein ===7 && searchSauce === 4){
    const searchPairing = Wine.category('6','7');
  } else if (searchProtein ===7 && searchSauce === 5){
    const searchPairing = Wine.category('7');
  } else if (searchProtein ===8 && searchSauce === 1){
    const searchPairing = Wine.category('5','7');
  } else if (searchProtein ===8 && searchSauce === 2){
    const searchPairing = Wine.category('6','7', '8');
  } else if (searchProtein ===8 && searchSauce === 3){
    const searchPairing = Wine.category('7', '8');
  } else if (searchProtein ===8 && searchSauce === 4){
    const searchPairing = Wine.category('7', '8');
  } else if (searchProtein ===8 && searchSauce === 5){
    const searchPairing = Wine.category('7', '8');
  } 
  return searchPairing;

  const search = {
    searchProtein, 
    searchSauce, 
    searchPairing
  };

  const newSearch = await addSearch(null, {searchInput});

  return newSearch;


}

module.exports = winePairing;
