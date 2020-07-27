import React from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

const Task = () => {
    return (
        <div>
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-row align-items-center">
                    <h5>Asignar Trabajo</h5>
                    <FontAwesomeIcon icon="tasks" size="2x" pull="right" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Table hover className="text-center">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Empleado</th>
                            <th>Cargo</th>
                            <th>Pendientes</th>
                            <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Call Center</td>
                            <td>10</td>
                            <td>
                                <Link to="/Tasks/create" className="btn btn-success">
                                    <FontAwesomeIcon icon="search-plus" />
                                </Link>
                            </td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Marketing</td>
                            <td>2</td>
                            <td>
                                <Link to="/Tasks/create" className="btn btn-success">
                                    <FontAwesomeIcon icon="search-plus" />
                                </Link>
                            </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Task;