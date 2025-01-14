// src/components/SuperAdminManagement.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../css/SuperAdminManagement.module.css';

// const SuperAdminManagement = () => {
//   const [ordersList, setOrdersList] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [siteNames, setSiteNames] = useState([]);
//   const [selectedSite, setSelectedSite] = useState('');
//   const API_BASE_URL = 'http://localhost:5000/api'; 
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/orders`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         if (!response.ok) throw new Error('Failed to fetch orders');
//         const data = await response.json();
//         console.log(data);
//         setOrdersList(data);
//         setFilteredOrders(data);

//         // Extract unique site names
//         const uniqueSites = Array.from(new Set(data.map((order) => order.siteName)));
//         setSiteNames(uniqueSites);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleFilterBySite = (siteName) => {
//     setSelectedSite(siteName);
//     const filtered = ordersList.filter((order) => order.siteName === siteName);
//     setFilteredOrders(filtered);
//   };

//   const handleEditOrder = (orderId) => {
//     navigate(`/edit-order/${orderId}`);
//   };

//   const handleDeleteOrder = async (orderId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       if (response.ok) {
//         setOrdersList(ordersList.filter((order) => order._id !== orderId));
//         setFilteredOrders(filteredOrders.filter((order) => order._id !== orderId));
//       } else {
//         const errorData = await response.json();
//         console.error('Error deleting order:', errorData);
//         alert('Failed to delete order');
//       }
//     } catch (error) {
//       console.error('Error deleting order:', error);
//     }
//   };

//   const handleToggleDetails = (orderId) => {
//     const updatedOrders = filteredOrders.map((order) =>
//       order._id === orderId ? { ...order, showDetails: !order.showDetails } : order
//     );
//     setFilteredOrders(updatedOrders);
//   };

//   return (
//     <div className="container-fluid p-4">
//       <h4>Super Admin - Orders Management</h4>

//       {/* Site Filter */}
//       <div className="mb-3">
//         <label className="form-label">Filter by Site:</label>
//         <select
//           className="form-select"
//           value={selectedSite}
//           onChange={(e) => handleFilterBySite(e.target.value)}
//         >
//           <option value="">All Sites</option>
//           {siteNames.map((siteName, idx) => (
//             <option key={idx} value={siteName}>
//               {siteName}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Orders Table */}
//       <div className="table-responsive">
//         <table className="table table-bordered table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>Site Name</th>
//               <th>Category</th>
//               <th>SubCategory</th>
//               <th>Location</th>
//               <th>Quantity</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.length > 0 ? (
//               filteredOrders.map((order) => (
//                 <tr key={order._id} onClick={() => handleToggleDetails(order._id)} style={{ cursor: 'pointer' }}>
//                   <td>{order.siteName}</td>
//                   <td>{order.category}</td>
//                   <td>{order.subcategory}</td>
//                   <td>{order.location}</td>
//                   <td>{order.quantity}</td>
//                   <td>
//                     <button
//                       className="btn btn-sm btn-warning me-2"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleEditOrder(order._id);
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDeleteOrder(order._id);
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center">
//                   No orders available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Order Details Toggle */}
//       <div>
//         {filteredOrders.map((order) => (
//           order.showDetails && (
//             <div key={order._id} className="order-details mt-3">
//               <h5>Order Details</h5>
//               <p><strong>Site Name:</strong> {order.siteName}</p>
//               <p><strong>Category:</strong> {order.category}</p>
//               <p><strong>SubCategory:</strong> {order.SubCategory}</p>
//               <p><strong>Location:</strong> {order.location}</p>
//               <p><strong>Quantity:</strong> {order.quantity}</p>
//               <p><strong>Description:</strong> {order.description || 'N/A'}</p>
//             </div>
//           )
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SuperAdminManagement;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SuperAdminManagement.module.css';

const SuperAdminManagement = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [siteNames, setSiteNames] = useState([]);
  const [selectedSite, setSelectedSite] = useState('');
  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrdersList(data);
        setFilteredOrders(data);

        // Extract unique site names
        const uniqueSites = Array.from(new Set(data.map((order) => order.siteName)));
        setSiteNames(uniqueSites);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleFilterBySite = (siteName) => {
    setSelectedSite(siteName);
    const filtered = ordersList.filter((order) => order.siteName === siteName);
    setFilteredOrders(filtered);
  };

  const handleToggleDetails = (orderId) => {
    const updatedOrders = filteredOrders.map((order) =>
      order._id === orderId ? { ...order, showDetails: !order.showDetails } : order
    );
    setFilteredOrders(updatedOrders);
  };

  return (
    <div className="container-fluid p-4">
      <h4 className="mb-4">Requirement Products</h4>

      {/* Site Filter */}
      <div className="mb-3">
        <label className="form-label">Filter by Site:</label>
        <select
          className="form-select"
          value={selectedSite}
          onChange={(e) => handleFilterBySite(e.target.value)}
        >
          <option value="">All Sites</option>
          {siteNames.map((siteName, idx) => (
            <option key={idx} value={siteName}>
              {siteName}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Box Layout */}
      <div className="column">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div className="col-md-4 mb-4" key={order._id}>
           {/* Flex Container */}
           <div className="d-flex align-items-start">

           
            
          {/* Order Box */}
              
              <div
                className="card shadow-sm"
                onClick={() => handleToggleDetails(order._id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body">
                  <h6 className="card-title">{order.siteName}</h6>
                  <p className="card-text">
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p className="card-text">
                    <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {order.showDetails && (
                <div className="card mt-3">
                  <div className="card-body">
                    <h6 className="mb-3">Order Details</h6>
                    <div className="row">
                      <div className="col-md-6">
                    <p><strong>Category:</strong> {order.category}</p>
                    </div>
                    <div className='col-md-6'>
                    <p><strong>SubCategory:</strong> {order.subcategory}</p>
                    </div>
                    <div className='col-md-6'>
                    <p><strong>Location:</strong> {order.location}</p>
                    </div>
                    <div className='col-md-6'>
                    <p><strong>Quantity:</strong> {order.quantity}</p>
                    </div>
                    <div className='col-md-6'>
                    <p><strong>Status:</strong> {order.status}</p>
                    </div>
                  </div>
                </div>
                </div>
              )}
            </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No orders available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminManagement;
