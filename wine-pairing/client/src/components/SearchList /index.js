import React from 'react';
import { Link } from 'react-router-dom';

const SearchList = ({
  searches,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!searches.length) {
    return <h3>No Searches Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {searches &&
        searches.map((search) => (
          <div key={search._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${search.searchProtien}`}
                >
                  {search.searchSauce} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this thought on {search.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You searched this on {search.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{search.searchProtien}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/searches/${search._id}`}
            >
              Join the discussion on this thought.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default SearchList;
