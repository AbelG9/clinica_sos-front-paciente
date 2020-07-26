import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import Topbar from "./Topbar";
import PrivateRoute from "../../PrivateRoute";
import * as Routes from '../../routes/index'
import TaskDetail from "../../pages/TaskDetail";

const Content = ({ sidebarIsOpen, toggleSidebar, allowedRoutes }) => {
  return (
    <Container
      fluid
      className={classNames("content", { "is-open": sidebarIsOpen })}
    >
      <Topbar toggleSidebar={toggleSidebar} routes={allowedRoutes} />
      {
        allowedRoutes.map((route) => {
          return (
            <PrivateRoute 
              exact
              key={route.url}
              path={route.url}
              component={Routes[route.component]}
            />
          )
        })
      }
      <PrivateRoute exact path="/TaskLists/taskdetail" component={TaskDetail} />
    </Container>
  )
};

export default Content;