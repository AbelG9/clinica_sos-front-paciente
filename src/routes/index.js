import React from 'react';
import Paciente from '../pages/callcenter/Paciente';
import PatientCalled from '../pages/callcenter/PatientCalled';

// Private routes.
const AdminOnly = () => <div>admin</div>;
const Users = () => <div>Users</div>;
const Dashboard = () => <div>Dashboard</div>;
const Manager = () => <div>Manager</div>;
const Customers = () => <div>Customers</div>;
const Service1 = () => <div>Service1</div>;
const Service2 = () => <div>Service2</div>;
const Profile = () => <div>Profile</div>;
const Home = () => <div>Home</div>;
const Pacientes = () => <Paciente />;
const calledPatient = () => <PatientCalled />;

export {
	calledPatient,
	Dashboard,
	Pacientes,
	AdminOnly,
	Users,
	Manager,
	Customers,
	Service1,
	Service2,
	Profile,
	Home
};
