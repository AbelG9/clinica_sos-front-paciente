import React from 'react';
import Paciente from '../pages/callcenter/Paciente';
import TaskList from '../pages/TaskList';

// Private routes.
const AdminOnly = () => <div>admin</div>;
const Dashboard = () => <div>En desarrollo</div>;
const Pacientes = () => <Paciente />;
const TaskLists = () => <TaskList />;

export {
	Dashboard,
	AdminOnly,
	Pacientes,
	TaskLists,
};
