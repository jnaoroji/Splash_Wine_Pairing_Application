import React from "react";
import { useNavigate } from "react-router-dom";


// Import the `useParams()` hook
import { useParams } from "react-router-dom"; //use link or redirect when implemented
import { useQuery, useMutation} from "@apollo/client";
import { QUERY_SINGLE_WINE } from "../utils/queries";
import { ADD_WINE } from "../utils/mutations";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import Auth from "../utils/auth";

const SingleWine = () => {
  // Use `useParams()` to retrieve value of the route parameter `:wineId`
  const { wineId } = useParams();
  
  const navigate = useNavigate();


  const [addWine, { loading: wineLoading, error: wineError, data: wineData }] = useMutation(ADD_WINE)
  
  const { loading, error, data } = useQuery(QUERY_SINGLE_WINE, {
    // pass URL parameter
    variables: { wineId },
  });
  if (error || loading) {
    return <div>Loading...</div>;
  }

  const wine = data?.getSingleWine || {};

  if (wineLoading) return `Saving Wine...`;
  if (wineError) return `Error cant Save your wine choice!`;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    
    try {
      addWine ({
        variables: {
          wineId,
          username: Auth.getProfile().data.username,
        },
        
      }).then((response) => {
        
        navigate(`/me`);
        
        
      });
    } catch (err) {
   
      console.error(err);
    }
  };


  return (
    <main>
      <div className="flex-row my-4">
        {/* Renders wine */}
        <div
          className="flex-row bg-trans pair-card shadow col-12 mb-3 pb-3"
          key={wine._id}
          style={{ color: "black", display: "flex", alignItems: "center" }}
        >
          {/* Container for the image */}
          <div
            className="wine-image-container .col-xs-6 .col-md-4"
            style={{ width: "400px", marginRight: "20px" }}
          >
            <img alt={wine.name} height="600px" src={wine.image} />
          </div>
          {/* Container for the content */}
          <div style={{ width: "600px", marginRight: "20px" }}>
            <div className="wine-info-container mt-4 .col-xs-12 .col-sm-6 .col-md-8">
              <h4>
                {wine.name} {wine.vintage}
              </h4>
              <h6>{wine.varietal}</h6>
              <h6>{wine.region}</h6>
              <h6 className="text-wrap">{wine.tastingNote}</h6>
              <h6>${wine.price}</h6>
              {/* save and add to cart buttons */}
              <div className="mt-4">
                <button
                  type="submit"
                  onClick={handleFormSubmit}
                  className="btn btn-sm btn-info shadow mt-5 mb-5"
                >
                  Save this Wine
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 m-3 p-4 bg-trans shadow">
        <CommentForm wineId={wine._id} />
      </div>
      <div className="m-3 p-4">
        <CommentList comments={wine.comments} />
      </div>
    </main>
  );
};

export default SingleWine;
