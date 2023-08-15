import React from 'react';
import { Link } from 'react-router-dom';

const WineList = ({
  wines,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!wines.length) {
    return <h3>No Wine Pairs for this combination</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {wines &&
        wines.map((wine) => (
          <div key={wine._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${wine.wineAuthor}`}
                >
                  {wine.wineAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this wine on {wine.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this wine on {wine.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{wine.wineText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/wines/${wine._id}`}
            >
              Join the discussion on this wine.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default WineList;
