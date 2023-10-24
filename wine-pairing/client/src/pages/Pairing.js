import React from "react";
import { useNavigate } from "react-router-dom";


// Import the `useParams()` hook
import { useParams } from "react-router-dom"; //use link or redirect when implemented
import { useQuery} from "@apollo/client";
import { QUERY_PAIRING_BY_ID } from "../utils/queries";


// import CommentList from "../components/CommentList";
// import CommentForm from "../components/CommentForm";
// import Auth from "../utils/auth";

const SinglePairing = () => {
  // Use `useParams()` to retrieve value of the route parameter `:wineId`
  const { pairingId } = useParams();
//   console.log(pairingId);
  
//   const navigate = useNavigate();


//   const [addWine, { loading: wineLoading, error: wineError, data: wineData }] = useMutation(ADD_WINE)
 

  const { loading, error, data } = useQuery(QUERY_PAIRING_BY_ID, {
    // pass URL parameter
    variables: { pairingId },
  });
//   console.log(data);
//   console.log('protein', data?.pairing?.protein?.name);
//   console.log('sauce', data?.pairing?.sauce?.name);
  if (error || loading) {
    return <div>Loading...</div>;
  }

  const pairing = data?.pairing || {};
//   console.log(data?.pairing);




  return (
    <main>
      <div className="flex-row my-4">
        {/* Renders wine */}
        <div
          className="flex-row bg-trans pair-card shadow col-12 mb-3 pb-3"
          key={pairing._id}
          style={{ color: "black", display: "flex", alignItems: "center" }}
        >
          {/* Container for the image */}
          <h4 className= "text-center">This pairing is for {data?.pairing?.protein?.name} with a {data?.pairing?.sauce?.name} Sauce</h4>
          {/* Container for the content */}
          <div style={{ width: "600px", marginRight: "20px" }}>
            <div className="wine-info-container mt-4 .col-xs-12 .col-sm-6 .col-md-8">
              <h4>
               {/* This PAIRING IS FOR {pairing.protein.name} & {pairing.sauce.name} */}
              </h4>
              {/* <h6>{pairing.varietal}</h6>
              <h6>{pairing.region}</h6>
              <h6 className="text-wrap">{pairing.tastingNote}</h6>
              <h6>${pairing.price}</h6> */}
             

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SinglePairing;
