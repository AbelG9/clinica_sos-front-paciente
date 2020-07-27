import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import URL from '../../config/URL';
import Loader from '../../components/Loader';
import GiveTask from './GiveTask';
import TaskCard from '../TaskManager/TaskCard';
import Loarder from '../../components/Loader';

const Task = () => {
    const { state } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState(1);
    const [routeTask, setRouteTask] = useState('getUserTask');

    useEffect(() => {
        const getFullTask = async () => {
            try {
                setLoading(true);
              let token = state.data.access_token;
              const username = state.data.username;
              const config = {
                headers: { Authorization: `Bearer ${token}` }
              };
              let res = await Axios.post(`${URL}staff/${routeTask}`, {username}, config);
              let response = await res.data;
              console.log(response);
              if (response.success) {
                setData(response.task);
                setLoading(false);
              }
            } catch (e) {
                console.log(e)
            }
        };
        getFullTask();
    }, [routeTask])

    const handleTabs = (e) => {
        e.preventDefault();
        switch (parseInt(e.target.id)) {
            case 1:
                setRouteTask('getUserTask');
                break;
            case 2:
                setRouteTask('getFullTasks');
                break;
            case 3:
                setRouteTask('getFullFinishedTasks');
                break;
            default:
                break;
        }
        setTab(parseInt(e.target.id));
    };

    const renderSwitch = (page) => {
        switch (page) {
            case 1:
                return (
                    <GiveTask
                        userData={data}
                        loading={loading}
                    />
                )
            case 2:
                return (
                    loading ? <Loarder /> :
                    data.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                    })
                )
            case 3:
                return (
                    loading ? <Loarder /> :
                    data.map((task) => {
                        return <TaskCard key={task.id} task={task} />
                    })
                )
            default:
                return null;
        }
    }

    return (
        <div>
          <ul className="nav nav-tabs d-flex flex-row justify-content-center">
            <li className="nav-item">
              <Link
                className={`nav-link ${tab === 1 ? "active" : ""}`}
                id="1"
                to="/"
                onClick={handleTabs}
              >
                Asignar Trabajo
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${tab === 2 ? "active" : ""}`}
                id="2"
                to="/"
                onClick={handleTabs}
              >
                Trabajos pendientes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${tab === 3 ? "active" : ""}`}
                id="3"
                to="/"
                onClick={handleTabs}
              >
                Trabajos completados
              </Link>
            </li>
          </ul>
          {renderSwitch(tab)}
        </div>
      );
}

export default Task;