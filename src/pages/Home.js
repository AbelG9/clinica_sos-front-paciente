import React, { useState, useEffect, useContext } from 'react';
import SideBar from '../components/sidebar/SideBar';
import Content from '../components/content/Content';
import { rolesConfig } from '../config/Roles';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { state } = useContext(AuthContext);
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  const [allowedRoutes, setAllowedRoutes] = useState([]);
  let ROUTE = rolesConfig[state.data.role].routes;

  useEffect(() => {
    setAllowedRoutes(ROUTE);
  }, [ROUTE]);

  return (
    <div className="App wrapper">
      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} allowedRoutes={allowedRoutes} />
      <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} allowedRoutes={allowedRoutes} />
    </div>
  );
}

export default Home;