import { React } from "react";
import { Navigate, useParams, Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, error, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log("data", data);

  // Map over user's wine data and get the wine IDs
  const userWineIds = user?.wine?.map((wine) => wine._id) || [];

  console.log("userParam", userParam);

  console.log("user", data?.user);
  console.log("me", data?.me);

  console.log("me.wine", data?.me.wine);
  // console.log('me.wine[0]._id', data?.me.wine[0]._id);
  // console.log('user.wine', data?.user.wine);
  // console.log('user.wine[0]._id', data?.user.wine[0]._id);
  // console.log("Is user logged in?", Auth.loggedIn());
  // console.log("User Profile:", Auth.getProfile());

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!...</div>;
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
            <h3 className="text-center"> Welcome, {user.username}! </h3>
            <div className="row">
              <div className="col-6">
                <h4>You have {user?.pairing?.length || 0} pairings saved</h4>
              </div>
              <div className="col-6">
                <h4>You have {user?.wine?.length || 0} wines saved</h4>
                {/* Map over user's wine data and render a card for each wine */}
                {user?.wine?.map((wine) => (
                  <div
                    className="container-fluid flex-row"
                    key={wine._id}
                    style={{ flex: 1, width: "600px", marginRight: "20px" }}
                  >
                    <div className="pairing-container col-sm">
                      {/* Renders wine card */}

                      <Link
                        to={`/wine/${wine._id}`}
                        className="pair-card shadow col-sm"
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
                                <h6>{wine.name}</h6>
                              </span>
                              <span>
                                <h6>${wine.price}</h6>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
