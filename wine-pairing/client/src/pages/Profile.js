import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";

import {
  useQuery,
  useMutation,

} from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import { REMOVE_WINE } from "../utils/mutations";

import WineList from "../components/WineList";

const Profile = () => {
  const { username: userParam } = useParams();

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
  ] = useMutation(REMOVE_WINE);

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
    return <div>Loading...</div>;
  }
  if (error || wineError) {
    return <div>Error: {error?.message || wineError?.message}</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
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
              {/* Updates the number of pairings saved */}
                <h4 className="col-6">You have {pairingsSaved} pairings saved</h4>
                 {/* Updates the number of wines saved */}
                <h4 className="col-6">You have {winesSaved} wines saved</h4>
                <h5 className="col-12 text-center mt-4"> {user.username}'s Wines! </h5>
               
                <div className="m-3 p-4">
                  <WineList wines={user?.wine} />
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
