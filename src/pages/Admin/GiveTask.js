import React from 'react';
import Loarder from '../../components/Loader';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GiveTask = ({ userData, loading }) => {
    return (
        <div>
                        <div className="row">
                            <div className="col">
                                {
                                    loading ? <Loarder /> :
                                    <Table hover className="text-center">
                                        <thead>
                                            <tr>
                                            <th>#</th>
                                            <th>Empleado</th>
                                            <th>Cargo</th>
                                            <th>Celular</th>
                                            <th>Pendientes</th>
                                            <th>Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userData.map((data) => (
                                                    <tr key={data.id}>
                                                        <th scope="row">{data.id}</th>
                                                        <td>{data.full_name}</td>
                                                        <td>{data.role}</td>
                                                        <td>{data.phone}</td>
                                                        <td>-</td>
                                                        <td>
                                                            <Link to={`/Tasks/create/${data.id}`} className="btn btn-success">
                                                                <FontAwesomeIcon icon="search-plus" />
                                                            </Link>
                                                            <Link to={`/Tasks/create/${data.id}`} className="btn btn-info">
                                                                <FontAwesomeIcon icon="tasks" />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                }
                            </div>
                        </div>
                    </div>
    );
}

export default GiveTask;