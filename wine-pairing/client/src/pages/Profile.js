import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import { REMOVE_WINE } from "../utils/mutations";

const Profile = () => {
  const { username: userParam } = useParams();
  // const pairingId

  // Defines state variables for pairings and wines saved
  const [pairingsSaved, setPairingsSaved] = useState(0);
  const [winesSaved, setWinesSaved] = useState(0);

  // Add the 'user' state and 'setUser' function to manage user data
  const [user, setUser] = useState({});

  const { loading, error, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const [
    removeWine,
    { loading: wineLoading, error: wineError, data: wineData },
  ] = useMutation(REMOVE_WINE, {
    update(cache, { data: { removeWine } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeWine },
        });

        return wineData;
      } catch (e) {
        console.error(e);
      }
    },
  });

  useEffect(() => {
    if (!loading && !error) {
      // Assuming your GraphQL query returns the counts for pairings and wines
      const pairingsCount =
        data?.user?.pairing?.length || data?.me?.pairing?.length || 0;
      const winesCount =
        data?.user?.wine?.length || data?.me?.wine?.length || 0;

      // Update the state variables with the counts
      setPairingsSaved(pairingsCount);
      setWinesSaved(winesCount);

      setUser(data?.user || data?.me || {});
    }
  }, [data, loading, error]);

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading || wineLoading) {
    return <div className="bg-trans mt-4">Loading...</div>;
  }
  if (error || wineError) {
    return (
      <div className="bg-trans mt-4">
        Error: {error?.message || wineError?.message}
      </div>
    );
  }

  if (!user?.username) {
    return (
      <h5 className="bg-trans mt-4">
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h5>
    );
  }

  const handleDeleteWine = async (wineId) => {
    try {
      const { data } = await removeWine({
        variables: {
          wineId,
          username: Auth.getProfile()?.data?.username,
        },
      });
      // Remove the deleted wine from the user's wine array in the local state
      if (user) {
        const updatedUser = { ...user };
        updatedUser.wine = updatedUser.wine.filter(
          (wine) => wine._id !== wineId
        );
        setUser(updatedUser);
      }

      // Decrease the winesSaved count
      setWinesSaved((prevWinesSaved) => prevWinesSaved - 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <div>
        <div className="pairing-container bg-trans flex-row justify-center mb-3">
          <div>
            <h3 className="text-center mb-4"> Welcome, {user.username}! </h3>
            <div className="row">
              <div className="col-md-6 text-center">
                {/* Update the number of wines saved */}

                {user.wine.length > 0 ? (
                  <div>
                    <h4 className="text-center">
                      {user.username}'s saved wines ({winesSaved}):
                    </h4>
                    <ul>
                      {user.wine.map((wine) => (
                        <li
                          key={wine._id}
                          className="pair-card shadow"
                          style={{ listStyleType: "none" }}
                        >
                          <Link
                            to={`/wines/${wine._id}`}
                            key={wine._id}
                            // className="pair-card shadow"
                            style={{ color: "black" }}
                          >
                            <div style={{ width: 240 }}>
                              <div>
                              {wine.image ? (
                                  <img
                                  alt={wine.name}
                                  height="400px"
                                  src={wine.image}
                                />
                                ) : (
                                  <h6>Click here if wines are still loading ...</h6>
                                )}
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
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <h4>You haven't saved any wines yet.</h4>
                )}
              </div>
              <div className="col-md-6 text-center">
                {/* Update the number of pairings saved */}

                <ul>
                  {user.pairing.length > 0 ? (
                    <div>
                      <h4 className="text-center">
                        {user.username}'s saved pairings ({pairingsSaved}):
                      </h4>

                      {user.pairing.map((pairing) => (
                        <li
                          key={pairing._id}
                          className="pair-card shadow"
                          style={{ listStyleType: "none" }}
                        >
                          <Link
                            to={`/pairings/${pairing._id}`}
                            style={{ color: "black" }}
                          >
                            <div style={{ width: 240 }}>
                              <div>
                                {/* Display any relevant pairing information */}
                               
                                {pairing.protein && pairing.sauce ? (
                                  <h6>
                                    {pairing.protein.name} with a{" "}
                                    {pairing.sauce.name} Sauce
                                  </h6>
                                ) : (
                                  <h6>Click here if pairings are still loading ...</h6>
                                )}

                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </div>
                  ) : (
                    <h4>You haven't saved any pairings yet.</h4>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
