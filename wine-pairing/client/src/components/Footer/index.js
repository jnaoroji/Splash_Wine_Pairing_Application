import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (


    
      <footer className="w-100 mt-auto bg-primary p-5">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <div className="container px-4 px-lg-5">
          <div className="small text-center text-white mb-3">Copyright &copy; 2023 - Jenny Naoroji</div>
          <div className="d-flex justify-content-center text-center">
            <a href="https://github.com/jnaoroji" className="small text-center text-white mr-2"><i className="bi bi-github"></i></a>
            <a href="https://www.linkedin.com/in/jenny-naoroji-158b29281/" className="small text-center text-white"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
