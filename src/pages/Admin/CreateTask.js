import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const CreateTask = () => {
    return (
        <div>
            <div className="row">
                <div className="col">
                    <Breadcrumb tag="nav" listTag="div">
                        <BreadcrumbItem><Link to="/Tasks">Crear tareas</Link></BreadcrumbItem>
                        <BreadcrumbItem active tag="span">Asignar tarea</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;