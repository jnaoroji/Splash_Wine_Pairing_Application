import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import CommentList from '../components/CommentList';
// import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_SEARCH } from '../utils/queries';

const SingleSearch = () => {
  // Use `useParams()` to retrieve value of the route parameter `:pairingId`
  const { wineId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_SEARCH, {
    // pass URL parameter
    variables: { pairingId: pairingId },
  });

  const wine = data?.wine || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      
    </main>
  );
};

export default SingleSearch;
