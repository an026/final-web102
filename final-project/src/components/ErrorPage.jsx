import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', width: '100vw'}}>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Click <Link to="/">here</Link> to return to the homepage.</p>
    </div>
  );
};

export default ErrorPage;
