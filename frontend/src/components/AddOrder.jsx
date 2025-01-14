// import React, { useState } from 'react';
// import '../css/AddOrder.css';

// const AddOrder = () => {
//   const [order, setOrder] = useState({
    
//     customerName: '',
//     productName: '',
//     quantity: '',
//     price: '',
//   });

//   //generate a unique Id based on the site name



//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(order),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Order saved:', data);
//         // Optionally reset the form after submission
//         setOrder({ customerName: '', productName: '', quantity: '', price: '',siteName: '', category:'' });
//       } else {
//         console.error('Failed to save order');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h3>Add Order</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Customer Name</label>
//           <input
//             type="text"
//             className="form-control"
//             value={order.customerName}
//             onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Product Name</label>
//           <input
//             type="text"
//             className="form-control"
//             value={order.productName}
//             onChange={(e) => setOrder({ ...order, productName: e.target.value })}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Quantity</label>
//           <input
//             type="number"
//             className="form-control"
//             value={order.quantity}
//             onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Price</label>
//           <input
//             type="number"
//             className="form-control"
//             value={order.price}
//             onChange={(e) => setOrder({ ...order, price: e.target.value })}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddOrder;



///////////////////////3444444444444

// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is installed
// import '../css/Addorder.module.css';


// const API_BASE_URL = 'http://localhost:5000/api';

// const AddOrder = () => {
//   const [categories, setCategories] = useState({
//     Board: ['2-inch', '4-inch', '8-inch'],
//     Hardware: ['Nails', 'Bolts', 'Screws'],
//     'Electric item': ['Wires', 'Switches', 'Sockets'],
//   });

//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedSubcategories, setSelectedSubcategories] = useState([]);
//   const [newOrder, setNewOrder] = useState({
//     category: '',
//     subcategory: '',
//     location: '',
//     quantity: '',
//   });


//   // useEffect(() => {
//   //   // Fetch categories and subcategories from the API
//   //   const fetchCategories = async () => {
//   //     try {
//   //       const response = await fetch(`${API_BASE_URL}/categories`);
//   //       if (!response.ok) throw new Error('Failed to fetch categories');
//   //       const data = await response.json();
//   //       setCategories(data);
//   //     } catch (error) {
//   //       console.error('Error fetching categories:', error);
//   //       toast.error('Failed to load categories. Please try again later.');
//   //     }
//   //   };

//   //   fetchCategories();
//   // }, []);




//   const handleCategoryChange = (e) => {
//     const category = e.target.value;
//     setSelectedCategory(category);
//     setSelectedSubcategories(categories[category] || []);
//     setNewOrder({ ...newOrder, category, subcategory: '' }); // Reset subcategory
//   };

//   const handleSubcategoryChange = (e) => {
//     setNewOrder({ ...newOrder, subcategory: e.target.value });
//   };

//   const handleAddOrder = async() => {
//     if (!newOrder.category || !newOrder.subcategory || !newOrder.location || !newOrder.quantity) {
//       toast.error('All fields are required!');
//       return;
//     }

//     const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
//     if (!token) {
//       toast.error('You must be logged in to add an order.');
//       return;
//     }
//     try {
//       const response = await fetch(`${API_BASE_URL}/orders`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`, // Add token to the request
//         },
//         body: JSON.stringify(newOrder),
//       });

//       if (response.ok) {
//         toast.success('Order added successfully!');
//         resetForm();
//       } else {
//         const errorData = await response.json();
//         console.error('Error adding order:', errorData);
//         toast.error('Failed to add order. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error in handleAddOrder:', error);
//       toast.error('An error occurred while processing the order.');
//     }
//   };



//     // Handle order submission logic here
//   //   console.log('Order added:', newOrder);
//   //   toast.success('Order added successfully!');
//   //   resetForm();
//   // };

//   const resetForm = () => {
//     setNewOrder({
//       category: '',
//       subcategory: '',
//       location: '',
//       quantity: '',
//     });
//     setSelectedCategory('');
//     setSelectedSubcategories([]);
//   };

//   return (
//     <div className="container mt-4">
//       <ToastContainer />
//       <h4>Order Products</h4>
//       <div className="border rounded p-4 bg-light">
//         <h5>Add New Order</h5>
//         <div className="row">
//           <div className="col-md-4 mb-3">
//             <label>Category</label>
//             <select
//               className="form-control"
//               value={newOrder.category}
//               onChange={handleCategoryChange}
//             >
//               <option value="">Select Category</option>
//               {Object.keys(categories).map((cat, idx) => (
//                 <option key={idx} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-md-4 mb-3">
//             <label>Subcategory</label>
//             <select
//               className="form-control"
//               value={newOrder.subcategory}
//               onChange={handleSubcategoryChange}
//               disabled={!selectedSubcategories.length}
//             >
//               <option value="">Select Subcategory</option>
//               {selectedSubcategories.map((subcat, idx) => (
//                 <option key={idx} value={subcat}>
//                   {subcat}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-md-4 mb-3">
//             <label>Location</label>
//             <input
//               type="text"
//               className="form-control"
//               value={newOrder.location}
//               onChange={(e) => setNewOrder({ ...newOrder, location: e.target.value })}
//             />
//           </div>
//           <div className="col-md-4 mb-3">
//             <label>Quantity</label>
//             <input
//               type="number"
//               className="form-control"
//               value={newOrder.quantity}
//               onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
//             />
//           </div>
//           <div className="col-md-4 d-flex align-items-end">
//             <button className="btn btn-primary w-100" onClick={handleAddOrder}>
//               Add Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddOrder;



import React, { useState } from 'react';
import AddSidebar from './AddSidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Addorder.module.css';
const API_BASE_URL = 'http://localhost:5000/api/orders';

const AddOrder = () => {
  const [categories, setCategories] = useState({
    Board: ['2-inch', '4-inch', '8-inch'],
    Hardware: ['Nails', 'Bolts', 'Screws'],
    'Electric item': ['Wires', 'Switches', 'Sockets'],
  });

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [newOrder, setNewOrder] = useState({
    category: '',
    subcategory: '',
    location: '',
    quantity: '',
  });


  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSubcategories(categories[category] || []);
    setNewOrder({ ...newOrder, category, subcategory: '' });
  };

  const handleSubcategoryChange = (e) => {
    setNewOrder({ ...newOrder, subcategory: e.target.value });
  };

  const handleAddCategory = () => {
    

      if (newCategory.trim() && !categories[newCategory]) {
        setCategories({
          ...categories,
          [newCategory]: [],
        });
        setNewCategory('');
        toast.success('Category added!');
      } else {

      toast.error('Categoryalready exists or is invalid! ');
      
    }
  };
    

  const handleAddSubcategory = () => {
    if (selectedCategory.trim()&&!selectedSubcategories.includes(newSubcategory))

   {
    const updatedCategories = { ...categories };
    updatedCategories[selectedCategory].push(newSubcategory);
    setCategories(updatedCategories);
    setNewSubcategory('');
    toast.success('Subcategory added!');
  } else {

      toast.error('Subcategory already exists or is invalid!');
  }
    };

  const handleAddOrder = async () => {
    if (!newOrder.category || !newOrder.subcategory || !newOrder.location || !newOrder.quantity) {
      toast.error('All fields are required!');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to add an order.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        toast.success('Order added successfully!');
        resetForm();
      } else {
        const errorData = await response.json();
        console.error('Error adding order:', errorData);
        toast.error('Failed to add order. Please try again.');
      }
    } catch (error) {
      console.error('Error in handleAddOrder:', error);
      toast.error('An error occurred while processing the order.');
    }
  };

  const resetForm = () => {
    setNewOrder({
      category: '',
      subcategory: '',
      location: '',
      quantity: '',
    });
    setSelectedCategory('');
    setSelectedSubcategories([]);
  };

  return (


<div className="d-flex">
{/* Sidebar Section */}
<div className="col-md-2 p-0 vh-100 bg-dark" style={{ position: 'fixed', left: 0, top: 0 }}>
  <AddSidebar />
</div>

{/* Main Content Section */}
<div className="container mt-5" style={{ marginLeft: "16.67%" }}  >
      <ToastContainer />
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white text-center">
          <h4>Add New Order</h4>
        </div>
        <div className="card-body">
          {/* Add Category Section */}
          <div className="row mb-4">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add New Category"
              />
            </div>
            <div className="col-md-6">
              <button className="btn btn-primary w-100" onClick={handleAddCategory}>
                Add Category
              </button>
            </div>
          </div>

          {/* Add Subcategory Section */}
          {selectedCategory && (
            <div className="row mb-4">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  placeholder="Add New Subcategory"
                />
              </div>
              <div className="col-md-6">
                <button className="btn btn-info w-100" onClick={handleAddSubcategory}>
                  Add Subcategory
                </button>
              </div>
            </div>
          )}

          {/* Order Details Section */}
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Category</label>
              <select
                className="form-control"
                value={newOrder.category}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {Object.keys(categories).map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label>Subcategory</label>
              <select
                className="form-control"
                value={newOrder.subcategory}
                onChange={handleSubcategoryChange}
                disabled={!selectedSubcategories.length}
              >
                <option value="">Select Subcategory</option>
                {selectedSubcategories.map((subcat, idx) => (
                  <option key={idx} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                value={newOrder.location}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, location: e.target.value })
                }
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                value={newOrder.quantity}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, quantity: e.target.value })
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="row">
            <div className="col-md-12 text-center">
              <button className="btn btn-success w-50" onClick={handleAddOrder}>
                Submit Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddOrder;