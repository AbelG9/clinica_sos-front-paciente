// component's config object.
const components = {
	admin: {
		component: 'AdminOnly',
		url: '/admin-only',
		title: 'Admin Only',
		icon: 'menu',
		module: false
	},
	dashboard: {
		component: 'Dashboard',
		url: '/dashboard',
		title: 'Dashboard',
		icon: 'menu',
		module: false
	},
	Pacientes: {
		component: 'Pacientes',
		url: '/pacientes',
		title: 'Pacientes',
		icon: 'home',
		module: false
	},
	TaskList: {
		component: 'TaskLists',
		url: '/TaskLists',
		title: 'Tareas',
		icon: 'menu',
		module: false
	},
	Task: {
		component: 'Tasks',
		url: '/Tasks',
		title: 'Crear tareas',
		icon: 'home',
		module: false
	},
	Report: {
		component: 'Report',
		url: '/informe',
		title: 'Informe',
		icon: 'home',
		module: false
	},
	UserReport: {
		component: 'UsersReports',
		url: '/reportUsers',
		title: 'Informes',
		icon: 'home',
		module: false
	}
};

const modules = {
	ventas: {
		module: true,
		title: 'ventas',
		icon: 'home',
		items: [
			components.UserReport,
			components.Task,
		]
	},
	compras: {
		module: true,
		title: 'compras',
		icon: 'home',
		items: [
			components.Pacientes,
			components.Report,
		]
	}
}

// component's access to roles.
const rolesConfig = {
	admin: {
		routes: [
			components.Task,
			components.UserReport,
		]
	},
	call_center: {
		routes: [
			components.Pacientes,
			components.TaskList,
			components.Report
		]
	},
	marketing: {
		routes: [
			components.TaskList,
			components.Report
		]
	},
	prueba: {
		routes: [
			modules.ventas,
			components.dashboard,
			modules.compras,
		]
	}
};

export { rolesConfig };
