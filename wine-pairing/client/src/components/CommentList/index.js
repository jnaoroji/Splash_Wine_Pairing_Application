import React from 'react';
import { useParams } from "react-router-dom";
import { useMutation } from '@apollo/client';

import { REMOVE_COMMENT } from '../../utils/mutations';
import Auth from '../../utils/auth';


const CommentList = ({ comments = [] } ) => {
  const { wineId } = useParams();

  const [removeComment, { loading, error, data }]= useMutation(REMOVE_COMMENT);

  
  if (loading) return 'Deleting comment...';
  if (error) return `Comment deletion error! ${error.message}`;

  const handleDeleteComment = async (commentId, wineId) => {

    try {
      const { data } = await removeComment({
        variables: {
          wineId,
          username: Auth.getProfile()?.data?.username,
          commentId,
        },
      });
      
      
      return window.location.reload();

      
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <h5 className="p-5 text-center">...Comments...</h5>
      
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-trans shadow text-light">
                <div className='card-header bg-info text-white d-flex align-items-center justify-content-between'>
                  <h5 className="flex">
                    {comment.commentAuthor} commented{' '}
                    <span style={{ fontSize: '0.825rem' }}>
                      on {comment.createdAt}
                    </span>
                    
                  </h5>
                  <button 
                  onClick={() => handleDeleteComment(comment._id, wineId)}
                  className='btn btn-info'><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div>
               
                <p className="card-body">{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
