import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { QUERY_PROTEINS, QUERY_SAUCES} from '../../utils/queries';
import Auth from '../../utils/auth';
import { QUERY_PAIRING } from '../../utils/queries';
import { ADD_PAIRING } from '../../utils/mutations';


const SearchForm = ({ selectedProtein, selectedSauce }) => {
  const [searchProtein, setSearchProtein] = useState(selectedProtein || '');
  const [searchSauce, setSearchSauce] = useState(selectedSauce || '');
  const [searchActive, setSearchActive] = useState(false); // Tracks search activity
  const [addPairing] = useMutation(ADD_PAIRING);

  // Use the useQuery hook to fetch proteins and sauces data
  const { loading: proteinsLoading, error: proteinsError, data: proteinsData } = useQuery(QUERY_PROTEINS);
  const { loading: saucesLoading, error: saucesError, data: saucesData } = useQuery(QUERY_SAUCES);

  const proteins = proteinsData ? proteinsData.proteins : []; 
  const sauces = saucesData ? saucesData.sauces : []; 

  // UseQuery hook to fetch getPairing
  const [getPairing, { loading: pairingLoading, error: pairingError, data: pairingData }] = useLazyQuery(QUERY_PAIRING);


  //handles form submit
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
    setSearchActive(true);
  };

  const handleAddPairing = () => {
    // Execute the mutation with the current searchProtein and searchSauce values

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
    console.log(Auth.getProfile());
    const username = Auth.getProfile()?.data?.username;
    addPairing({
      variables: {
        username,
        searchProtein: selectedProteinObject._id,
        searchSauce: selectedSauceObject._id,
      },
    })
      .then((response) => {
        // Handle successful response if needed
        console.log('Pairing saved:', response);
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error saving pairing:', error);
      });
  };


  const handleClearForm = () => {
    // Clear the form fields by setting their values to an empty string
    setSearchProtein('');
    setSearchSauce('');

    // Reset the select elements to their default values
    document.querySelector("select[name='selectedProtein']").value = '0';
    document.querySelector("select[name='selectedSauce']").value = '0';

    getPairing({
      variables: {
        searchProtein: '', // set these to empty strings to ensure clearing
        searchSauce: '',
      },
    });

    setSearchActive(false);
  };
  
  
  return (
    <main>
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
                  className="form-select btn-lg ml-2 mr-4"
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
                You need to be logged in to search for Wine Pairings. Please{' '}
                <Link className='text-info' to="/login">login</Link> or <Link className= "text-info" to="/signup">signup.</Link>
              </p>
            )}
      </div>
    </div>

      {pairingLoading && <p>Loading...</p>}
      {pairingData && pairingData.getPairing && (
        <div className='pairing-container'>
          {/* Renders pairing results*/}
          {pairingData.getPairing.map((pairing) => (
            <Link to={`/wine/${pairing._id}`} className ="pair-card shadow" key={pairing._id} style={{ color: 'black' }}>
              
              <div style={{ width: 240 }}>
                <div>
                  <img alt={pairing.name} height="400px" src={pairing.image}/>
                </div>
                <div className="custom-card mt-4">
                  <div className="d-flex justify-content-between">
                    <span><h6>{pairing.name}</h6></span><span><h6>${pairing.price}</h6></span>
                  </div>
                </div>
              </div>
            </Link>

          ))}
        </div>
      )}
      {/* Conditionally render the buttons based on searchActive */}
      {searchActive && (
              <div>
                <button
                  className="btn btn-danger btn-sm mr-3"
                  type="button"
                  onClick={handleClearForm}
                >
                  Start a new Search
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  type="button"
                  onClick={handleAddPairing}
                >
                  Save to My Pairings
                </button>
              </div>
            )}

    </main>
  );
};

export default SearchForm;
