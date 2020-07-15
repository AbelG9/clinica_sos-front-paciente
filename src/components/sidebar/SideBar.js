import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

// import SubMenu from "./SubMenu";
// JSON.parse(localStorage.getItem('data')).access_token

const SideBar = ({ isOpen, toggle, allowedRoutes }) => {
  const nameUser = JSON.parse(localStorage.getItem('data')).full_name;

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <Link to="/pacientes"><h3>Clinica Fairdent</h3></Link>
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
        {
          allowedRoutes.map((route) => {
            return(
              <NavItem key={route.url}>
                <NavLink tag={Link} to={route.url}>
                  {route.title}
                </NavLink>
              </NavItem>
            )
          })
        }
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
  )
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