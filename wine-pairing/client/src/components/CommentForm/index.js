import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';


import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';


const CommentForm = ({ wineId }) => {
  const [commentText, setCommentText] = useState('');
  // const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { loading, error, data }]= useMutation(ADD_COMMENT);

  if (loading) return 'Submitting comment...';
  if (error) return `Comment Submission error! ${error.message}`;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

   
    try {
      const { data } = await addComment({
        variables: {
          wineId,
          commentText,
          commentAuthor: Auth.getProfile()?.data?.username
        },
      });
      
      setCommentText('');
      return data;

      
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
    }
  };



  return (
    <div>
      <h5 className="text-center">What are your thoughts on this wine?</h5>
      {/* <StarRating/> */}
      

      {Auth.loggedIn() ? (
        <>

          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="commentText"
                placeholder="Leave a Comment..."
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              >
              </textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-info btn-block py-3" type="submit">
                Add Comment
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your comments. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
