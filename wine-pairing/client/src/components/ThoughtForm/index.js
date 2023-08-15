import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';


import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ThoughtForm = () => {
  const [thoughtText, setThoughtText] = useState('');

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThought({
        variables: {
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;

    if (value.length <= 280) {
      setThoughtText(value);
      console.log(value);//fetch req here
      // Request URL: https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=3ae88756&app_key=b5170a61434670ec70710b53c612c5ed

    }
  };

  return (
    <div className="search-container">
      <div className= "searchbar-container">
      {/* <h3>Search your recipe!</h3> */}
      {Auth.loggedIn() ? (
        <>
          <form
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
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to search for recipes. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
      </div>

      <div>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Choose your protien
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">white meat</a>
            <a className="dropdown-item" href="#">Red meat</a>
            <a className="dropdown-item" href="#">tofu</a>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default ThoughtForm;
