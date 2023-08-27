import  React, {useState, useEffect}  from "react";
import { Navigate, useParams, Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import { REMOVE_WINE } from "../utils/mutations";

const Profile = () => {
  const { username: userParam } = useParams();

  // Defines state variables for pairings and wines saved
  const [pairingsSaved, setPairingsSaved] = useState(0);
  const [winesSaved, setWinesSaved] = useState(0);

  const { loading, error, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const [removeWine, { loading: wineLoading, error: wineError, data: wineData }]= useMutation(REMOVE_WINE);

  useEffect(() => {
    if (!loading && !error) {
      // Assuming your GraphQL query returns the counts for pairings and wines
      const pairingsCount = data?.user?.pairing?.length|| data?.me?.pairing?.length || 0;
      const winesCount = data?.user?.wine?.length || data?.me?.wine?.length || 0;

      // Update the state variables with the counts
      setPairingsSaved(pairingsCount);
      setWinesSaved(winesCount);
    }
  }, [data, loading, error]);

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading || wineLoading) {
    return <div>Loading...</div>;
  }
  if (error || wineError) {
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

  const handleDeleteWine = async (_id) => {

    try {
      await removeWine({
        variables: {
          wineId: _id,
          username: Auth.getProfile()?.data?.username,
        },
        update: (cache, { wineData }) => {
          // Update the cache to remove the deleted wine from the user's wine list
          cache.modify({
            id: cache.identify(user), // Assuming user is the current user
            fields: {
              wine(existingWines = [], { readField }) {
                return existingWines.filter(
                  (wineRef) => _id !== readField("_id", wineRef)
                );
              },
            },
          });
        },
      });
      
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <main>
      <div>
        <div className="pairing-container bg-trans flex-row justify-center mb-3">
          <div>
            <h3 className="text-center"> Welcome, {user.username}! </h3>
            <div className="row">
              <div className="col-6">
                 {/* Update the number of pairings saved */}
                 <h4>You have {pairingsSaved} pairings saved *</h4>
                <h4>You have {user?.pairing?.length || 0} pairings saved</h4>
                {/* Map over user's pairing data and render a card for each pairing */}
                {user?.pairing?.map((pairing) => (
                  <div
                    className="container-fluid flex-row"
                    key={pairing._id}
                    style={{ flex: 1, width: "600px", marginRight: "20px" }}
                  >
                    <div className="pairing-container col-sm">
                      {/* Renders wine card */}

                      {/* <Link
                        to={`/${pairing._id}`}
                        className="pair-card shadow col-sm"
                        key={pairing._id}
                        style={{ color: "black" }}
                      > */}
                      <div
                        
                        className="pair-card shadow col-sm"
                        key={pairing._id}
                        style={{ color: "black" }}
                      >
                        <div style={{ width: 240 }}>
                          <div className="custom-card mt-4">
                            <div className="d-flex justify-content-between">
                              <span>
                                <h6>{pairing.id}</h6>
                              </span>
                              <span>
                                <h6>{pairing.category}</h6>
                              </span>
                              <span>
                                <h6>{pairing.protein}</h6>
                              </span>
                              <span>
                                <h6>{pairing.sauce}</h6>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* </Link> */}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-6">
                 {/* Update the number of wines saved */}
                 <h4>You have {winesSaved} wines saved *</h4>
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
                      <button 
                         onClick={() => handleDeleteWine(wine._id)}
                        style={{ position: "absolute", top: 0, right: 0, }} 
                        className='btn btn-trans'><i className="fa fa-trash mr-2" aria-hidden="true"></i>
                        </button>
                      <Link
                        to={`/wine/${wine._id}`}
                        className="pair-card shadow col-sm"
                        key={wine._id}
                        style={{ color: "black", position: "relative" }}
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
