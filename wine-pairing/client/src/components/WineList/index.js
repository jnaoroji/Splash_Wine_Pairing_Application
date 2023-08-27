import React from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { REMOVE_WINE } from "../../utils/mutations";
import Auth from "../../utils/auth";

const WineList = ({ wines = [] }) => {

  const [removeWine, { loading, error, data }] = useMutation(REMOVE_WINE);

  if (loading) return "Deleting wine...";
  if (error) return `Wine deletion error! ${error.message}`;

  const handleDeleteWine = async (wineId) => {
    try {
      const { data } = await removeWine({
        variables: {
          wineId,
          username: Auth.getProfile()?.data?.username,
        },
      });

      return window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex-row my-4">
        {wines &&
          wines?.map((wine) => (

            <div
              className="container-fluid flex-row"
              key={wine._id}
              // style={{ flex: 1, width: "600px", marginRight: "20px" }}
            >
              <div className="pairing-container col-sm">
                {/* Renders wine card */}
                <button
                  onClick={() => handleDeleteWine(wine._id)}
                  style={{ position: "absolute", top: 0, right: 0 }}
                  className="btn btn-trans"
                >
                  <i className="fa fa-trash mr-2" aria-hidden="true"></i>
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
                        loading="eager"
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
    </>
  );
};

export default WineList;
