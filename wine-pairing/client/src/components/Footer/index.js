import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    // <footer className="w-100 mt-auto bg-secondary p-4">
    //   <div className="container text-center mb-5">
    //     {location.pathname !== '/' && (
    //       <button
    //         className="btn btn-dark mb-3"
    //         onClick={() => navigate(-1)}
    //       >
    //         &larr; Go Back
    //       </button>
    //     )}
    //     <h4>
    //       Made with{' '}
    //       <span
    //         className="emoji"
    //         role="img"
    //         aria-label="heart"
    //         aria-hidden="false"
    //       >
    //         ❤️
    //       </span>{' '}
    //       by Jenny Naoroji.
    //     </h4>
    //   </div>
    // </footer>

    <footer className="bg-nav py-5">
        <div className="container px-4 px-lg-5">
          <div className="small text-center text-muted mb-3">Copyright &copy; 2023 - Jenny Naoroji</div>
          <div className="d-flex justify-content-center text-center">
            <a href="https://github.com/jnaoroji" className="small text-center text-muted me-3"><i className="bi bi-github"></i></a>
            <a href="https://www.linkedin.com/in/jenny-naoroji-158b29281/" className="small text-center text-muted me-3"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
    </footer>

  );
};

export default Footer;
