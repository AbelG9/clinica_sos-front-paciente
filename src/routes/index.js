import React from 'react';
import Paciente from '../pages/callcenter/Paciente';
import TaskList from '../pages/TaskManager/TaskList';
import Task from '../pages/Admin/Task';
import Informe from '../pages/informes/Informe';
import UsersReport from '../pages/Admin/informes/UsersReport';

// Private routes.
const AdminOnly = () => <div>admin</div>;
const Dashboard = () => <div>En desarrollo</div>;
const Pacientes = () => <Paciente />;
const TaskLists = () => <TaskList />;
const Tasks = () => <Task />
const Report = () => <Informe />
const UsersReports = () => <UsersReport />

export {
	Dashboard,
	AdminOnly,
	Pacientes,
	TaskLists,
	Tasks,
	Report,
	UsersReports,
};
