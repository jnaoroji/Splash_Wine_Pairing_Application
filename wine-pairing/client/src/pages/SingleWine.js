import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_WINE } from '../utils/queries';

const SingleWine = () => {
  // Use `useParams()` to retrieve value of the route parameter `:wineId`
  const { wineId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_WINE, {
    // pass URL parameter
    variables: { wineId},
  });

  const wine = data?.getSingleWine || {};


  if (loading) {
    return <div>Loading...</div>;
  }
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
              <button className= "btn btn-sm btn-info shadow mr-2">Save this Wine</button>
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
