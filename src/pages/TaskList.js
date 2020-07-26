import React, { useState } from "react";
import "../assets/styles/TaskList.css";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tab, setTab] = useState(2);

  const handleTabs = (e) => {
    e.preventDefault();
    setTab(parseInt(e.target.id));
  };

  const renderSwitch = (page) => {
    switch (page) {
      case 1:
        return <div>mensaje</div>;
      case 2:
        return (
          <div>
            <div className="card shadow-sm my-3 mx-3 w-auto">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-center">
                  <div className="mr-3">
                    <div className="text-left">
                      <h5 className="card-title">
                        Titulo de la tarea encargada
                      </h5>
                      <small className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content
                      </small>
                    </div>
                    <div className="text-left">
                      <small className="text-muted">
                        fecha de publicacion: 25/05/2020
                      </small>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <small>Finaliza en:</small>
                    <small className="text-muted">25/05/2020 1:00pm</small>
                    <Link to="/TaskLists/taskdetail" className="btn btn-warning text-white">
                        Pendiente!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
