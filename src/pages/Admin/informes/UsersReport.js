import React, { useState, useContext, useEffect } from 'react';
import { Table, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import URL from '../../../config/URL';
import Loader from '../../../components/Loader';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UsersReport = () => {
    const { state } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const username = state.data.username;
    const [data, setData] = useState([]);

    const getUsers = async () => {
        setLoading(true);
        try {
            let token = state.data.access_token;
            const config = {
              headers: { Authorization: `Bearer ${token}` }
            };
            let res = await Axios.post(`${URL}staff/informes/getAllUsers`, {username}, config);
            let response = await res.data;
            if (response.success) {
                setData(response.user);
                // console.log(response.user);
                setLoading(false);
            }
          } catch (e) {
              console.log(e);
              setLoading(false);
          }
    }

    useEffect(() => {
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div>
            <Breadcrumb>
                <BreadcrumbItem active>Lista de usuarios</BreadcrumbItem>
            </Breadcrumb>
                <div>
                    {
                        loading ? <Loader /> : 
                        <Table hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Empleado</th>
                                <th>Cargo</th>
                                <th>Celular</th>
                                <th>Informes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((user) => {
                                        return (
                                            <tr key={user.id}>
                                                <th scope="row">{user.id}</th>
                                                <td>{user.full_name}</td>
                                                <td>{user.role}</td>
                                                <td>{user.phone}</td>
                                                <td><Link to={`reportUsers/ListReport/${user.id}`} className="btn btn-info">
                                                <FontAwesomeIcon icon="tasks" />
                                                </Link></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    }
                </div>
            </div>
        </div>
    );
}

export default UsersReport;