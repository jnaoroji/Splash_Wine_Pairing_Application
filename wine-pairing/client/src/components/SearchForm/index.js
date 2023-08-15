import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';


import { ADD_SEARCH } from '../../utils/mutations';
import { QUERY_SEARCHES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';




const SearchForm = ({ selectedProtein, selectedSauce }) => {
  
  const [searchProtein, setSearchProtein] = useState(selectedProtein || '');
  const [searchSauce, setSearchSauce] = useState(selectedSauce || '');


  const [addSearch, { error }] = useMutation(ADD_SEARCH, {
    update(cache, { data: { addSearch } }) {
      try {
        const { searches } = cache.readQuery({ query: QUERY_SEARCHES });

        cache.writeQuery({
          query: QUERY_SEARCHES,
          data: { thoughts: [addSearch, ...searches] },
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

    console.log('Selected Protein:', searchProtein);
    console.log('Selected Sauce:', searchSauce);



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

      //fetch req here
      // Request URL: https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=3ae88756&app_key=b5170a61434670ec70710b53c612c5ed
    
  
  return (
    <div className="search-container">
      <div className= "searchbar-container">
      {/* <h3>Search your recipe!</h3> */}
      {Auth.loggedIn() ? (
        <>
          {/* <form
            className="flex-row justify-center align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <input
                name="thoughtText"
                placeholder="Search your recipe..."
                value={thoughtText}
                className="form-input w-100 "
                style={{ 
                  lineHeight: '1.5', 
                  resize: 'vertical', 
                  borderRadius:'15px',
                  border: '1px solid #461220', }}
                onChange={handleChange}
              />
              
            </div>
            <div>
              <button className="btn btn-info btn-sm py-3" type="submit">
              <i className="fas fa-search" aria-hidden="true"></i>
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form> */}

          <form className="flex-row justify-center align-center"
            onSubmit={handleFormSubmit}>
            <div className='select-container flex-row justify-center align-center'>
              <select 
              className="form-select btn-lg ml-2 mr-4 " 
              aria-label="Protein"
              name="Protein"
              value={searchProtein}
              onChange={(event) => setSearchProtein(event.target.value)}
              
              >
                <option selected value="0">Choose your Protein</option>
                <option value="1">Mollusk</option>
                <option value="2">Fish</option>
                <option value="3">Shellfish</option>
                <option value="4">Chicken or Pork</option>
                <option value="5">Red Meat</option>
                <option value="6">Cured Meat</option>
                <option value="7">Tofu/Seitan/Potato</option>
                <option value="8">Brassicas/Leafy greens</option>
              </select>


              <select 
              className="form-select btn-lg mr-4 " 
              aria-label="Sauce"
              name="Sauce"
              value={searchSauce}
              onChange={(event) => setSearchSauce(event.target.value)}
             
              >
                <option selected value="0">Choose your sauce</option>
                <option value="1">Strong Marinade</option>
                <option value="2">Tomato Based</option>
                <option value="3">Diary Based</option>
                <option value="4">Herbs Based</option>
                <option value="4">Chilli</option>
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
