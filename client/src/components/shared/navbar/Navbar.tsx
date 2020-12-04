import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FunctionComponent = () => {
  return (
    <ul>
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      <li>
        <Link to="/history">History</Link>
      </li>
      <li>
        <Link to="/configuration">Configuration</Link>
      </li>
    </ul>
  );
};

export default Navbar;
