import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
import { useLazyQuery, useQuery } from '@apollo/client';

// import { ADD_SEARCH } from '../../utils/mutations';
import { QUERY_PROTEINS, QUERY_SAUCES} from '../../utils/queries';

import Auth from '../../utils/auth';
import { QUERY_PAIRING } from '../../utils/queries';



const SearchForm = ({ selectedProtein, selectedSauce }) => {
  const [searchProtein, setSearchProtein] = useState(selectedProtein || '');
  const [searchSauce, setSearchSauce] = useState(selectedSauce || '');

  // Use the useQuery hook to fetch proteins and sauces data
  const { loading: proteinsLoading, error: proteinsError, data: proteinsData } = useQuery(QUERY_PROTEINS);
  const { loading: saucesLoading, error: saucesError, data: saucesData } = useQuery(QUERY_SAUCES);

  const proteins = proteinsData ? proteinsData.proteins : []; 
  const sauces = saucesData ? saucesData.sauces : []; 

  // Use a different name for variables to avoid conflicts
  const [getPairing, { loading: pairingLoading, error: pairingError, data: pairingData }] = useLazyQuery(QUERY_PAIRING);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Use the selectedProtein value to find the associated ObjectId
    const selectedProteinObject = proteins.find((protein) => protein.name === searchProtein);
    if (!selectedProteinObject) {
      console.error('Selected protein not found in the protein data.');
      return;
    }

    // Use the selectedSauce value to find the associated ObjectId
    const selectedSauceObject = sauces.find((sauce) => sauce.name === searchSauce);
    if (!selectedSauceObject) {
      console.error('Selected sauce not found in the sauces data.');
      return;
    }

    getPairing({
      variables: {
        searchProtein: selectedProteinObject._id,
        searchSauce: selectedSauceObject._id,
      },
    });
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
                  className="form-select btn-lg mr-4"
                  aria-label="Protien"
                  onChange={(event) => setSearchProtein(event.target.value)}
                >
                  <option value="0">Choose your Protein</option>
                  {proteins.map((protein) => (
                    <option key={protein._id} value={protein.name}>
                      {protein.name}
                    </option>
                  ))}
                </select>


              <select
                  name="selectedSauce"
                  defaultValue="0"
                  className="form-select btn-lg mr-4"
                  aria-label="Sauce"
                  onChange={(event) => setSearchSauce(event.target.value)}
                >
                  <option value="0">Choose your Sauce</option>
                  {sauces.map((sauce) => (
                    <option key={sauce._id} value={sauce.name}>
                      {sauce.name}
                    </option>
                  ))}
                </select>


              <div>
                <button className="btn btn-info btn-sm mr-2" type="submit">
                <i className="fas fa-search" aria-hidden="true"></i>
                </button>
                {saucesError && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {saucesError.message}
                </div>
              )}
               {proteinsError && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {proteinsError.message}
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
      {pairingLoading && <p>Loading...</p>}
      {pairingData && pairingData.getPairing && (
        <div>
          {/* Render your query results here */}
          {pairingData.getPairing.map((pairing) => (
            <div key={pairing._id}>
              <h2>{pairing.name}</h2>
              {/* Render other fields as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
