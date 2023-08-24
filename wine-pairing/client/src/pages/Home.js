import React from 'react';
import SearchForm from '../components/SearchForm';



const Home = () => {


  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 mb-3 p-3">
          {/* displays searchForm */}
          <SearchForm />
        </div>
        </div>
    </main>
  );
};

export default Home;
