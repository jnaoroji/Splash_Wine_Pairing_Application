import React from 'react';
// Import the `useParams()` hook
import { useParams, Navigate} from 'react-router-dom';//use link or redirect when implemented
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_WINE } from '../utils/queries';
import { ADD_WINE} from '../utils/mutations';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Auth from '../utils/auth';

const SingleWine = () => {
  // Use `useParams()` to retrieve value of the route parameter `:wineId`
  const { wineId } = useParams();
  const [addWine, { loading: wineLoading, error: wineError, data: wineData }] = useMutation(ADD_WINE);
  const { loading, error, data } = useQuery(QUERY_SINGLE_WINE, {
    // pass URL parameter
    variables: { wineId},
  })
  if (loading|| error) {
    return <div>Loading...</div>;
  };

  const wine = data?.getSingleWine || {};



  if (wineLoading) return `Saving Wine...`;
  if (wineError) return `Error cant Save your wine choice!`;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { wineData } = await addWine({
        variables: {
          wineId,
          username: Auth.getProfile().data.username,
        },
      });

      if (Auth.loggedIn() && Auth.getProfile().data.username) {
      return <Navigate to="/me" />;
      }
    
    } catch (err) {
      console.error(err);
    };
  };

  return (
    <main>
    <div className='pairing-container'>
      {/* Renders wine */}
      <div className="pair-card shadow" key={wine._id} style={{ color: 'black', display: 'flex', alignItems: 'center' }}>
        {/* Container for the image */}
        <div style={{ width: '400px', marginRight: '20px' }}>
          <img alt={wine.name} height="600px" src={wine.image} />
        </div>
        {/* Container for the content */}
        <div style={{ flex: 1, width: '600px', marginRight: '20px' }}>
          <div className="custom-card mt-4">
            <h4>{wine.name} {wine.vintage}</h4>
            
            <h6>{wine.varietal}</h6>
            <h6>{wine.region}</h6>
            <h6>{wine.tastingNote}</h6>
            <h6>${wine.price}</h6>
            {/* save and add to cart buttons */}
            <div className="mt-4">
              <button 
              onClick={handleFormSubmit}
              className= "btn btn-sm btn-info shadow mr-2">Save this Wine</button>
              <button className="btn btn-sm btn-light shadow">Add to cart</button>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div className="my-5">
        <CommentList comments={wine.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm wineId={wine._id} />
      </div>
  </main>
  );
};

export default SingleWine;
