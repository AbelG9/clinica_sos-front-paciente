import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import Topbar from "./Topbar";
import PrivateRoute from "../../PrivateRoute";
import * as Routes from '../../routes/index'
import TaskDetail from "../../pages/TaskManager/TaskDetail";
import CreateTask from "../../pages/Admin/CreateTask";
import ListReports from "../../pages/Admin/informes/ListReports";
import TaskListUser from "../../pages/Admin/Task/TaskListUser";

const Content = ({ sidebarIsOpen, toggleSidebar, allowedRoutes }) => {
  const renderRoute = (route) => {
    if (route.module) {
      return (
        route.items.map((item) => {
          return (
            <PrivateRoute 
              exact
              key={item.url}
              path={item.url}
              component={Routes[item.component]}
            />
          )
        })
      )
    } else {
      return (
        <PrivateRoute 
          exact
          key={route.url}
          path={route.url}
          component={Routes[route.component]}
        />
      )
    }
  }

  return (
    <Container
      fluid
      className={classNames("content", { "is-open": sidebarIsOpen })}
    >
      <Topbar toggleSidebar={toggleSidebar} routes={allowedRoutes} />
      {
        allowedRoutes.map((route) => renderRoute(route))
      }
      <PrivateRoute exact path="/TaskLists/taskdetail/:id" component={TaskDetail} />
      <PrivateRoute exact path="/Tasks/create/:id" component={CreateTask} />
      <PrivateRoute exact path="/reportUsers/ListReport/:id" component={ListReports} />
      <PrivateRoute exact path="/Tasks/listTask/:id" component={TaskListUser} />
    </Container>
  )
};

export default Content;