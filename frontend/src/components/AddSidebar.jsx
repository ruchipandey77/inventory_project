import React from 'react';
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

const OrderSidebar = () => {
  return (
    <div className="bg-dark vh-100 p-3" style={{width:'300px'}}>
      <ul className="list-unstyled">
      <li className="mb-3">
          
        
          <Link to="/profile" className="text-white text-decoration-none">
              Admin Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OrderSidebar;
