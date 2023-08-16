import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_SEARCH } from '../../utils/mutations';
import { QUERY_SEARCHES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';



const SearchForm = ({ selectedProtein, selectedSauce }) => {
  
  
  const [searchProtein, setSearchProtein] = useState(selectedProtein || '');
  const [searchSauce, setSearchSauce] = useState(selectedSauce || '');


//need to find better read query
  const [addSearch, { error }] = useMutation(ADD_SEARCH, {
    update(cache, { data: { addSearch } }) {
      console.log('made it here');
      try {
        const { searches } = cache.readQuery({ query: QUERY_SEARCHES });
        
        cache.writeQuery({
          query: QUERY_SEARCHES,
          data: { searches: [addSearch, ...searches] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, searches: [...me.searches, addSearch] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addSearch({
        variables: {
          searchProtein,
          searchSauce,
        },
      });

      setSearchProtein('');
      setSearchSauce('');
    } catch (err) {
      console.error(err);
    }
  };
  
  
  return (
    <div className="search-container">
      <div className= "searchbar-container">
      
      {Auth.loggedIn() ? (
        <>
          

          <form className="flex-row justify-center align-center"
            onSubmit={handleFormSubmit}>
            <div className='select-container flex-row justify-center align-center'>

              {/* Drop-downs with search criteria */}

              
              <select 
              name="selectedProtein" 
              defaultValue="0"                
              className="form-select btn-lg ml-2 mr-4 " 
              aria-label="Protein"
              onChange={(event) => setSearchProtein(event.target.value)}
              
              >
                <option value="0">Choose your Protein</option>
                <option value="1">Mollusk</option>
                <option value="2">Fish</option>
                <option value="3">Shellfish</option>
                <option value="4">Chicken or Pork</option>
                <option value="5">Red Meat</option>
                <option value="6">Tofu/Seitan/Potato</option>
                <option value="7">Brassicas/Leafy greens</option>
                <option value="8">Mushrooms</option>
                
              </select>


              <select 
              name="selectedSauce" 
              defaultValue="0"
              className="form-select btn-lg mr-4" 
              aria-label="Sauce"
              onChange={(event) => setSearchSauce(event.target.value)}
             
              >
                <option value="0">Choose your sauce</option>
                <option value="1">Strong Marinade</option>
                <option value="2">Tomato Based</option>
                <option value="3">Diary Based</option>
                <option value="4">Herbs Based</option>
                <option value="5">Chilli</option>
              </select>
              
              <div>
                <button className="btn btn-info btn-sm mr-2" type="submit">
                <i className="fas fa-search" aria-hidden="true"></i>
                </button>
                {error && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {error.message}
                </div>
              )}
              </div>
            </div>
          </form>

                    </>
            ) : (
              // Message displays when user has not logged in (cannot search)
              <p className='select-container'>
                You need to be logged in to search for recipes. Please{' '}
                <Link className='text-info' to="/login">login</Link> or <Link className= "text-info" to="/signup">signup.</Link>
              </p>
            )}
      </div>
    </div>
  );
};

export default SearchForm;
