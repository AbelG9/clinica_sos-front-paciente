import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import URL from '../../config/URL';
import Axios from 'axios';
import Loader from '../../components/Loader';
import TaskCard from './TaskCard';
import { Alert } from 'reactstrap';

const TaskList = () => {
  let { id } = useParams();
  const [tab, setTab] = useState(2);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [route, setRoute] = useState('getTasks');
  let userId = typeof id === "undefined" ? state.data.id : id;

  const handleTabs = (e) => {
    e.preventDefault();
    switch (parseInt(e.target.id)) {
      case 2:
        setRoute('getTasks');
        break;
      case 3:
        setRoute('getFinishedTasks');
        break;
      default:
        break;
    }
    setTab(parseInt(e.target.id));
  };

  useEffect(() => {
    const getPendingTasks = async () => {
      try {
        setLoading(true);
        let token = state.data.access_token;
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        let res = await Axios.post(`${URL}staff/${route}`, {userId}, config);
        let response = await res.data;
        if (response.success) {
          setTasks(response.task);
          setLoading(false);
        }
      } catch (e) {
          console.log(e)
      }
    }
    getPendingTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const renderCardTask = () => {
    if (tasks.length > 0) {
      return (
        tasks.map((task) => {
          return (
            <TaskCard key={task.id} task={task} />
          )
        })
      )
    } else {
      return (
        <div>
          <Alert className="text-center" color="success">
            No hay trabajos!
          </Alert>
        </div>
      )
    }
  }

  const renderSwitch = (page) => {
    switch (page) {
      case 2:
        return (
          <div>
          {
            loading ? <Loader /> :
            renderCardTask()
          }
          </div>
        );
      case 3:
        return (
          <div>
          {
            loading ? <Loader /> :
            renderCardTask()
          }
          </div>
        )
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <ul className="nav nav-tabs d-flex flex-row justify-content-center">
          <li className="nav-item">
            <Link
              className={`nav-link ${tab === 2 ? "active" : ""}`}
              id="2"
              to="/"
              onClick={handleTabs}
            >
              Tareas pendientes
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${tab === 3 ? "active" : ""}`}
              id="3"
              to="/"
              onClick={handleTabs}
            >
              Tareas completadas
            </Link>
          </li>
        </ul>
      </div>
      {renderSwitch(tab)}
    </div>
  );
};

export default TaskList;
