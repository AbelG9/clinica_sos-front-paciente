import React from 'react';
import Paciente from '../pages/callcenter/Paciente';
import TaskList from '../pages/TaskManager/TaskList';
import Task from '../pages/Admin/Task';

// Private routes.
const AdminOnly = () => <div>admin</div>;
const Dashboard = () => <div>En desarrollo</div>;
const Pacientes = () => <Paciente />;
const TaskLists = () => <TaskList />;
const Tasks = () => <Task />

export {
	Dashboard,
	AdminOnly,
	Pacientes,
	TaskLists,
	Tasks,
};
