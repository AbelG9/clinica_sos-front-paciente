// component's config object.
const components = {
	admin: {
		component: 'AdminOnly',
		url: '/admin-only',
		title: 'Admin Only',
		icon: 'menu',
		module: 1
	},
	dashboard: {
		component: 'Dashboard',
		url: '/dashboard',
		title: 'Dashboard',
		icon: 'menu',
		module: 1
	},
	Pacientes: {
		component: 'Pacientes',
		url: '/pacientes',
		title: 'Pacientes',
		icon: 'menu',
		module: 1
	},
	TaskList: {
		component: 'TaskLists',
		url: '/TaskLists',
		title: 'Tareas',
		icon: 'menu',
		module: 1
	},
	Task: {
		component: 'Tasks',
		url: '/Tasks',
		title: 'Crear tareas',
		icon: 'menu',
		module: 1
	},
};

// component's access to roles.
const rolesConfig = {
	admin: {
		routes: [...Object.values(components)]
	},
	call_center: {
		routes: [
			components.Pacientes,
			components.TaskList,
		]
	},
	marketing: {
		routes: [
			components.TaskList,
		]
	}
};

export { rolesConfig };
