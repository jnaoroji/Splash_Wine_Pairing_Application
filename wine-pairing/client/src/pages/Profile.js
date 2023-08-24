import React from 'react';
import { Navigate} from 'react-router-dom';
import { useQuery } from '@apollo/client';



import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = ({ username }) => {

  const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username },
  });
 
    

  console.log({ username: username });
  console.log('data', data);
  const user = data?.me || data?.user || {};
  console.log('user', user);
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
   
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
  console.log('Is Logged In:', Auth.loggedIn());
  console.log('Username from Auth:', Auth.getProfile().data.username);
  console.log('Username from useParams:', username);
  console.log(data);
  console.log(user);
  console.log(user.username);

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {username ? `${user.username}'s` : 'your'} profile.
        </h2>
        <p>this is {user.username} profile </p>
        <p>this user has {user?.pairing?.length || 0} pairings</p>
        <p>this user has {user?.wine?.length || 0} wines</p>
      </div>


        {/* <p>${user.pairings}</p> */}
        <div className="col-12 col-md-10 mb-5">
          {/* <WineList
            pairings={user.pairings}
            title={`${user.username}'s thoughts...`}
            showTitle={false}
            showUsername={false}
          /> */}
          {/* <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
            showTitle={false}
            showUsername={false}
          /> */}
        </div>
        {/* {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <SearchForm />
          </div>
        )} */}
      </div>
  
  );
};

export default Profile;
