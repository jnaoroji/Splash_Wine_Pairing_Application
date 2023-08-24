import React from 'react';

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h5 className="text-center">...No Comments Yet...</h5>;
  }

  return (
    <>
      <h5 className="p-5 text-center">...Comments...</h5>

      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-trans shadow text-light">
                <h5 className="card-header bg-info text-white">
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
