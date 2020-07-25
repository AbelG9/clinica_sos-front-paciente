import React from 'react';
import Paciente from '../pages/callcenter/Paciente';

// Private routes.
const AdminOnly = () => <div>admin</div>;
const Dashboard = () => <div>En desarrollo</div>;
const Pacientes = () => <Paciente />;

export {
	Dashboard,
	Pacientes,
	AdminOnly,
};
