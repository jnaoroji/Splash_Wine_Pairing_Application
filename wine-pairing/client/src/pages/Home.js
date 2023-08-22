import React from 'react';
// import { useQuery } from '@apollo/client';

// import SearchList from '../components/SearchList ';
import SearchForm from '../components/SearchForm';

// import { QUERY_PAIRING, QUERY_SEARCHES } from '../utils/queries';

const Home = () => {
  // const { loading, data } = useQuery(QUERY_PAIRING);
  // const pairings = data?.pairings || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 mb-3 p-3">
          {/* displays searchForm */}
          <SearchForm />
        </div>
        {/* displays search list - need to render then modify */}
        <div className="col-12 col-md-8 mb-3">
          {/* {loading ? (
            <div>Loading...</div>
          ) : (
            <SearchList
              pairings={pairings}
              title="your recent search..."
            />
          )} */}
        </div>
      </div>
    </main>
  );
};

export default Home;
