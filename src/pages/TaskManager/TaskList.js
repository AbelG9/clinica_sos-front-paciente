import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import URL from '../../config/URL';
import Axios from 'axios';
import Loader from '../../components/Loader';

const TaskList = () => {
  const [tab, setTab] = useState(2);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const handleTabs = (e) => {
    e.preventDefault();
    setTab(parseInt(e.target.id));
  };

  const getTasks = async () => {
    try {
      let userId = state.data.id;
      setLoading(true);
      let token = state.data.access_token;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      let res = await Axios.post(`${URL}staff/getTasks`, {userId}, config);
      let response = await res.data;
      console.log(response);
      if (response.success) {
        setTasks(response.task);
        setLoading(false);
      }
    } catch (e) {
        console.log(e)
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  const renderSwitch = (page) => {
    switch (page) {
      case 1:
        return <div>En desarrollo!</div>;
      case 2:
        return (
          <div>
          {
            loading ? <Loader /> :
            tasks.map((task) => (
              <div key={task.id} className="card shadow-sm my-3 mx-3 w-auto">
                <div className="card-body">
                  <div className="d-flex flex-row justify-content-center">
                    <div className="mr-3">
                      <div className="text-left">
                        <h5 className="card-title">
                          {task.asunto}
                        </h5>
                      </div>
                      <div className="text-left">
                        <small className="text-muted">
                          publicado: {task.created_at}
                        </small>
                      </div>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <small>Finaliza en:</small>
                      <small className="text-muted">{task.fechafin} {task.horafin}</small>
                      <Link to={`/TaskLists/taskdetail/${task.id}`} className="btn btn-warning text-white">
                          Pendiente!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
          </div>
        );
      default:
        return <div>default</div>;
    }
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className={`nav-link ${tab === 1 ? "active" : ""}`}
            id="1"
            to="/"
            onClick={handleTabs}
          >
            Anuncios
          </Link>
        </li>
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
      {renderSwitch(tab)}
    </div>
  );
};

export default TaskList;
