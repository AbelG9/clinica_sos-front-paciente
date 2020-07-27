import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
    return (
        <div className="card shadow-sm my-3 mx-3 w-auto">
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
                <Link to={`/TaskLists/taskdetail/${task.id}`} className={`btn btn-${task.estado === "PENDIENTE" ? 'warning' : 'success'} text-white`}>
                    {task.estado === "PENDIENTE" ? 'Pendiente!' : 'Completado!'}
                </Link>
              </div>
            </div>
          </div>
        </div>
    );
}

export default TaskCard;