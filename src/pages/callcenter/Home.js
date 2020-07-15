import React, { useState, useEffect } from 'react';
import SideBar from '../../components/sidebar/SideBar';
import Content from '../../components/content/Content';
import { rolesConfig } from '../../config/Roles';

const Home = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  const [allowedRoutes, setAllowedRoutes] = useState([]);

  useEffect(() => {
    setAllowedRoutes(rolesConfig['customer'].routes);
  }, []);

  return (
    <div className="App wrapper">
      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} allowedRoutes={allowedRoutes} />
      <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} allowedRoutes={allowedRoutes} />
    </div>
  );
}

export default Home;