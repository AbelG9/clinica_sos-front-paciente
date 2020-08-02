import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import TaskList from '../../TaskManager/TaskList';

const TaskListUser = () => {
    let location = useLocation();
    let data = typeof location.state === "undefined" ? '' : location.state.data;
    return (
        <div>
            <div>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/Tasks" >Crear tareas</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Ver tareas</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="d-flex flex-row justify-content-around">
                <p><strong>Usuario: </strong> {data.full_name}</p>
                <p><strong>Rol: </strong> {data.role}</p>
                <p><strong>Celular: </strong> {data.phone}</p>
            </div>
            <div>
                <TaskList />
            </div>
        </div>
    );
}

export default TaskListUser;