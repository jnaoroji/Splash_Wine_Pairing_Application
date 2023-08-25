import { React } from "react";
import { Navigate, useParams, Link } from "react-router-dom";

import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME, QUERY_SINGLE_WINE, QUERY_USER_WINES } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();
  console.log('userParam', userParam);


  const { loading, error, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // Map over user's wine data and get the wine IDs
  const userWineIds = user?.wine?.map((wine) => wine._id) || [];
  console.log('userWineIds', userWineIds);

  const wineId="64e878d51fb7e3df9d526c2f";

  
  // const { loading: wineLoading, error: wineError, data: wineData  } = useQuery(QUERY_SINGLE_WINE, {
  //   // pass URL parameter
  //   variables: {wineId},
  // })
  // if (loading|| error) {
  //   return <div>Loading...</div>;
  // };

  // const wine = wineData?.getSingleWine || {};
  // console.log('wine', wine);


  // if (wineLoading) return `Saving Wine...`;
  // if (wineError) return `Error cant Save your wine choice!`;
  
  // console.log('userWineIds', userWineIds);

  // console.log('user', data?.user);
  // console.log('me', data?.me);
  // console.log('me.wine', data?.me.wine);
  // console.log('me.wine[0]._id', data?.me.wine[0]._id);
 



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
            {/* Map over user's wine data and render a card for each wine */}
            {user?.wine?.map((wine) => (
        <div key={wine._id} style={{ flex: 1, width: "600px", marginRight: "20px" }}>
          <ul className="custom-card mt-4">
            <li>
              {wine._id} 
            </li>
            <button
            >
              Find wine
            </button>
          </ul>
        </div>
      ))}

                {/* <Link
                  to={`/wine/${wine._id}`}
                  className="pair-card shadow"
                  key={wine._id}
                  style={{ color: "black" }}
                >
                  <div style={{ width: 240 }}>
                    <div>
                      <img
                        alt={wine.name}
                        height="400px"
                        src={wine.image}
                      />
                    </div>
                    <div className="custom-card mt-4">
                      <div className="d-flex justify-content-between">
                        <span>
                          <h4>{wine.name}</h4>
                          <h6>${wine.price}</h6>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link> */}
      
    </main>
  );
};

export default Profile;
