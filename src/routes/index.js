import React from 'react';
import Paciente from '../pages/callcenter/Paciente';
import TaskList from '../pages/TaskManager/TaskList';
import Task from '../pages/Admin/Task';
import Informe from '../pages/informes/Informe';

// Private routes.
const AdminOnly = () => <div>admin</div>;
const Dashboard = () => <div>En desarrollo</div>;
const Pacientes = () => <Paciente />;
const TaskLists = () => <TaskList />;
const Tasks = () => <Task />
const Report = () => <Informe />

export {
	Dashboard,
	AdminOnly,
	Pacientes,
	TaskLists,
	Tasks,
	Report,
};
