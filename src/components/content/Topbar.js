import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Topbar = ({ toggleSidebar, routes }) => {
  const { dispatch } = useContext(AuthContext)
  const [topbarIsOpen, setTopbarOpen] = useState(false);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);

  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand="md"
    >
      <Button color="info" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ml-auto" navbar>
          {/* {
            routes.map((route) => {
              return(
                <NavItem key={route.url}>
                  <NavLink tag={Link} to={route.url}>
                    {route.title}
                  </NavLink>
                </NavItem>
              )
            })
          } */}
          <NavItem>
            <NavLink tag={Link} to="/" onClick={() => dispatch({ type: 'SIGNOUT'})} >
              Cerrar sesión
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Topbar;