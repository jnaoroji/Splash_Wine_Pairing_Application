import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {Select} from 'react-select';

import { ADD_SEARCH } from '../../utils/mutations';
import { QUERY_SEARCHES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const optionProtein = [
  {value:'0', label:'Choose your Protein'},
  { value: '1', label: 'Mollusk' },
  { value: '2', label: 'Fish' },    
  { value: '3', label: 'Shellfish' },
  { value: '4', label: 'Chicken/Pork' },
  { value: '5', label: 'Red Meat' },   
  { value: '6', label: 'Tofu/Seitan/Potato' },
  { value: '7', label: 'Brassicas/Leafy Greens' },
  { value: '8', label: 'Cured Meat'}
]
const optionSauce = [
  {value:'0', label:'Choose your sauce'},
  { value: '1', label: 'Tomato Based' },
  { value: '2', label: 'Diary Based' },    
  { value: '3', label: 'Herbs Based' },
  { value: '4', label: 'Chilli' },

]

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
  

  


  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'Protein') {
      setSearchProtein(value);
      console.log('protein = ' + value);
    } else if (name === 'Sauce') {
      setSearchSauce(value);
      console.log('sauce = ' + value);
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
         
          <form className="flex-row justify-center align-center"
            onSubmit={handleFormSubmit}>
            <div className='select-container flex-row justify-center align-center'>

              {/* Drop-downs with search criteria */}
              
              <Select 
              className="form-select btn-lg ml-2 mr-4 " 
              aria-label="Protein"
              name="Protein"
              value={optionProtein.find(option => option.value === selectedProtein)}
              onChange={selectedOption => setSearchProtein(selectedOption.value)}
              options={optionProtein}
              />
                
              


              <Select 
              className="form-select btn-lg mr-4 " 
              aria-label="Sauce"
              name="Sauce"
              value={optionSauce.find(option => option.value === selectedSauce)}
              onChange={selectedOption => setSearchSauce(selectedOption.value)}
              options={optionSauce}
              />
                
              
              
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
