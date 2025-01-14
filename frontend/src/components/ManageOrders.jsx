import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedOrder, setUpdatedOrder] = useState({
    SiteName: '',
    ProductName: '',
    quantity: '',
    location: '',
    category: '',
    vendor: '',

  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleUpdate = async (orderId) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });
      fetchOrders();
      setModalShow(false);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setUpdatedOrder({
      SiteName: order.SiteName,
      ProductName: order.ProductName,
      quantity: order.quantity,
      vendor: order.vendor,
      category: order.category,
      location: order.location,
    });
    setModalShow(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredOrders = orders.filter(order =>
    order.SiteName?.toLowerCase().includes(searchTerm) ||
    order.ProductName?.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Orders</h2>
      
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Site or Product"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Site Name</th>
            <th scope="col">Product Name</th>
            <th scope="col">category</th>
            <th scope="col">vendor</th>
            <th scope="col">Quantity</th>
            <th scope="col">location</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <tr key={order._id}>
                <td>{order.SiteName}</td>
                <td>{order.ProductName}</td>
                <td>{order.category}</td>
                <td>{order.vendor}</td>
                <td>{order.quantity}</td>
                <td>{order.location}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEditClick(order)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Update Modal */}
      <div className={`modal ${modalShow ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalShow ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Order</h5>
              <button type="button" className="close" aria-label="Close" onClick={() => setModalShow(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Site Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="customerName"
                    value={updatedOrder.SiteName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="productName"
                    value={updatedOrder.productName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    value={updatedOrder.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={updatedOrder.category}
                    onChange={handleInputChange}
                  />
                  </div>
                <div className="form-group">
                  <label>vendor</label>
                  <input
                    type="text"
                    className="form-control"
                    name="vendor"
                    value={updatedOrder.vendor}
                    onChange={handleInputChange}
                  />
                  </div>
                <div className="form-group">
                  <label>location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={updatedOrder.location}
                    onChange={handleInputChange}
                  />



                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setModalShow(false)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={() => handleUpdate(selectedOrder._id)}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
