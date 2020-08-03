import React, { useContext } from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Logo from '../../assets/img/logo.svg';
import SubMenu from './SubMenu';

const SideBar = ({ isOpen, toggle, allowedRoutes }) => {
  const { state } = useContext(AuthContext);
  const nameUser = state.data.full_name;

  const renderItem = (route) => {
    if (route.module) {
      return (
        <SubMenu key={route.title} title={route.title} icon={route.icon} items={route.items} />
      )
    } else {
      return (
        <NavItem key={route.url}>
          <NavLink tag={Link} to={route.url}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            {route.title}
          </NavLink>
        </NavItem>
      )
    }
  }

  return (
    <div className={classNames("sidebar shadow", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#713C8F" }}>
          &times;
        </span>
        <Link to="/pacientes" className="mx-auto">
          <img src={Logo} alt="Fairdent" className="w-75 mx-3 my-3" />
        </Link>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <p>{nameUser}</p>
          {/* <SubMenu title="Home" icon={faHome} items={submenus[0]} /> */}
          {allowedRoutes.map((route) => renderItem(route))}
        </Nav>
      </div>
    </div>
  );
};

export default SideBar;
