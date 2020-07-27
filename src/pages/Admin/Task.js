import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import URL from '../../config/URL';
import Loading from '../../components/Loader';

const Task = () => {
    const { state } = useContext(AuthContext);
    const username = state.data.username;
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        try {
            setLoading(true);
          let token = state.data.access_token;
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          let res = await Axios.post(`${URL}staff/getUserTask`, {username}, config);
          let response = await res.data;
          console.log(response);
          if (response.success) {
            setUserData(response.users);
            setLoading(false);
          }
        } catch (e) {
            console.log(e)
        }
      };

    useEffect(() => {
        getUsers();
    }, [])

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
                    {
                        loading ? <Loading /> :
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

export default Task;