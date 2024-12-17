import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <p>Hello</p>
      <Link to="/login">
        <button>Go to Login</button>
      </Link>
    </div>
  );
}

export default Home;