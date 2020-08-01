import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import TaskList from '../../TaskManager/TaskList';

const TaskListUser = () => {
    return (
        <div>
            <div>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/Tasks" >Crear tareas</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Usuario</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div>
                <TaskList />
            </div>
        </div>
    );
}

export default TaskListUser;