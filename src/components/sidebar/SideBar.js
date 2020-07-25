import React, { useContext } from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Logo from '../../assets/img/logo.svg';

const SideBar = ({ isOpen, toggle, allowedRoutes }) => {
  const { state } = useContext(AuthContext);
  const nameUser = state.data.full_name;

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
          {/* <NavItem>
          <NavLink tag={Link} to={"/about"}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </NavLink>
        </NavItem> */}
          {allowedRoutes.map((route) => {
            return (
              <NavItem key={route.url}>
                <NavLink tag={Link} to={route.url}>
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  {route.title}
                </NavLink>
              </NavItem>
            );
          })}
          {/* <SubMenu title="Pages" icon={faCopy} items={submenus[1]} />
        <NavItem>
          <NavLink tag={Link} to={"/pages"}>
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            Portfolio
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/faq"}>
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            FAQ
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/contact"}>
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Contact
          </NavLink>
        </NavItem> */}
        </Nav>
      </div>
    </div>
  );
};

// const submenus = [
//   [
//     {
//       title: "Home 1",
//       target: "Home-1",
//     },
//     {
//       title: "Home 2",
//       target: "Home-2",
//     },
//     {
//       itle: "Home 3",
//       target: "Home-3",
//     },
//   ],
//   [
//     {
//       title: "Page 1",
//       target: "Page-1",
//     },
//     {
//       title: "Page 2",
//       target: "Page-2",
//     },
//   ],
// ];

export default SideBar;
