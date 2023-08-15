import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// import Select from 'react-select';
import { Select } from 'antd';



import { ADD_SEARCH } from '../../utils/mutations';
import { QUERY_SEARCHES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const { Option, OptGroup } = Select;



const options = [
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
  


  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  
  //   if (name === 'Protein') {
  //     setSearchProtein(value);
  //     console.log('protein = ' + value);
  //   } else if (name === 'Sauce') {
  //     setSearchSauce(value);
  //     console.log('sauce = ' + value);
  //   }
  // };
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

              {/* Drop-downs with search criteria */}

              <Select defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
                <OptGroup label="Manager">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                </OptGroup>
                <OptGroup label="Engineer">
                  <Option value="Yiminghe">yiminghe</Option>
                </OptGroup>
              </Select>
                
                
              
              {/* <Select 
                className="form-select btn-lg ml-2 mr-4 " 
                aria-label="Protein"
                name="Protein"
                value={selectedProtein}
                onChange={(event) => setSearchProtein(event.target.value)}
                options={options} />
              
              <Select 
                className="form-select btn-lg ml-2 mr-4 " 
                aria-label="Protein"
                name="Protein"
                value={selectedSauce}
                onChange={(event) => setSearchSauce(event.target.value)}
                options={options} /> */}
              
              {/* <select 
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
              </select> */}


              {/* <select 
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
               */}
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
