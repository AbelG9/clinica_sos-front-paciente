import React, { Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem, Alert, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';

const TaskDetail = () => {
    return (
        <Fragment>
            <div className="row no-gutters mb-2">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/TaskLists">Tarea pendiente</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Detalle</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>
            <div className="row ">
                <div className="col-12 col-lg-8 col-xl-7">
                    <div className="card ">
                        <div className="card-body">
                            <h5 className="card-title">
                                Titulo de la tarea encargada
                            </h5>
                            <hr/>
                            <p>Instrucciones: </p>
                            <Jumbotron>
                                <small className="card-text">
                                    Some quick example text to build on the card title and
                                    make up the bulk of the card's content
                                </small>
                            </Jumbotron>
                            <div className="d-flex flex-column">
                                <small>Fecha de entrega</small>
                                <small>11/7/20, 2:00 a. m.</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4 col-xl-5">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                Tu Trabajo
                            </h5>
                            <hr/>
                            <Alert color="dark" className="text-center">
                                -
                            </Alert>
                            <button className="btn btn-warning">Agregar enlace</button>
                            <Alert color="warning" className="text-center mt-2">
                                <small>Trabajo aun no entregado!</small>
                            </Alert>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default TaskDetail;