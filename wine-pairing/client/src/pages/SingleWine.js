import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import CommentList from '../components/CommentList';
// import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_WINE } from '../utils/queries';

const SingleSearch = () => {
  // Use `useParams()` to retrieve value of the route parameter `:pairingId`
  const { wineId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_WINE, {
    // pass URL parameter
    variables: { wineId: wineId },
  });

  const wine = data?.wine || {};

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
          </div>
        </div>
      </div>
    </div>
  </main>
  );
};

export default SingleSearch;
