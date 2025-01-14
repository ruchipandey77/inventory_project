// import React from 'react';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
// import { Outlet } from 'react-router-dom';

// const Layout = () => {
  
//   return (
//     <div>
//       <Navbar />
//       <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
//         <Sidebar />
//         <div className="flex-grow-1 p-4" style={{ overflowY: 'auto', marginTop: '50px' }}>
//           {/* 70px is for the height of your Navbar */}
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AddSidebar from './AddSidebar'; // Import the sidebar for the Add Order page
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  // Determine which sidebar to show based on the current path
  const isAddOrderPage = location.pathname === '/AddOrder'; // Replace '/add-order' with the actual path of your Add Order page

  return (
    <div>
      <Navbar />
      <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
        {/* Conditionally render Sidebar or AddSidebar */}
        {isAddOrderPage ? <AddSidebar /> : <Sidebar />}
        <div className="flex-grow-1 p-4" style={{ overflowY: 'auto', marginTop: '50px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
