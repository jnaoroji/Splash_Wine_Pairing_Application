import { React, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, error, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <main>
      <div>
        <div className="pairing-container bg-trans flex-row justify-center mb-3">
          <div>
            <h4 className="text-center"> Welcome, {user.username}! </h4>

            <p>You have {user?.pairing?.length || 0} pairings saved</p>
            <p>You have {user?.wine?.length || 0} wines saved</p>

          </div>
        </div>
      </div>

      {/* <div style={{ flex: 1, width: '600px', marginRight: '20px' }}>
          <div className="custom-card mt-4">
            <h4>{wine.name} {wine.vintage}</h4>
            
            <h6>{wine.varietal}</h6>
            <h6>{wine.region}</h6>
            <h6>{wine.tastingNote}</h6>
            <h6>${wine.price}</h6>
            
            <div className="mt-4">
              <button 
              onClick={handleFormSubmit}
              className= "btn btn-sm btn-info shadow mr-2">Save this Wine</button>
              <button className="btn btn-sm btn-light shadow">Add to cart</button>
            </div>

          </div>
        </div> */}

      {/* <div className="card" style={{width: '100px'}}>
            <img src="" className="card-img-top" alt=""></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div> */}
    </main>
  );
};

export default Profile;
