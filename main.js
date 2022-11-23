import sqlite3 from "sqlite3";

class Todo {

	constructor(path) {
		this.database = new sqlite3.Database(path, () => {
			console.log('initialized empty database');
		});	
	}

	createUserTable = () => {
	
		const CREATE_USERS_TABLE = `
		CREATE TABLE IF NOT EXISTS users(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT, 
			username TEXT,
			password TEXT
		)`;
			
		return new Promise((resolve, reject) => {
			this.database.run(CREATE_USERS_TABLE, (result, err) => {
				if (err) {
					console.log(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	createListTable = () => {
	
		const CREATE_LISTS_TABLE = `
		CREATE TABLE IF NOT EXISTS lists(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT, 
			description TEXT,
			userId INTEGER,
			CONSTRAINT lists_fk_userId FOREIGN KEY (userId) REFERENCES users(id)
		)`;
			
		return new Promise((resolve, reject) => {
			this.database.run(CREATE_LISTS_TABLE, (result, err) => {
				if (err) {
					console.log(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	createTaskTable = () => {
	
		const CREATE_TASKS_TABLE = `
		CREATE TABLE IF NOT EXISTS tasks(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT, 
			description TEXT,
			listId INTEGER,
			CONSTRAINT lists_fk_listId FOREIGN KEY (listId) REFERENCES lists(id)
		)`;
			
		return new Promise((resolve, reject) => {
			this.database.run(CREATE_TASKS_TABLE, (result, err) => {
				if (err) {
					console.log(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	addUser = async (username, password, name) => {

		await this.createUserTable();

		const ADD_USER = `
			INSERT INTO users
			(name, username, password)
			VALUES(?, ?, ?)
		`;

		return new Promise((resolve, reject) => {
			this.database.run(ADD_USER, [name, username, password], (result, err) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	fetchUser = async (userId) => {

		const FIND_USER = `
			SELECT * FROM users 
			WHERE id = ?
		`;

		return new Promise((resolve, reject) => {
			this.database.get(FIND_USER, [userId], (err, result) => {
				if (err) {
					console.log(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	createList = async (name, description, userId) => {

		await this.createListTable();

		const ADD_LIST = `
			INSERT INTO lists
			(name, description, userId)
			VALUES(?, ?, ?)
		`;

		return new Promise((resolve, reject) => {
			this.database.run(ADD_LIST, [name, description, userId], (result, err) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	addTask = async (name, description, listId) => {

		await this.createTaskTable();

		const ADD_TASK = `
			INSERT INTO tasks
			(name, description, listId)
			VALUES(?, ?, ?)
		`;

		return new Promise((resolve, reject) => {
			this.database.run(ADD_TASK, [name, description, listId], (result, err) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	fetchListTasks = async (listId) => {
		const GET_LIST_TASKS = `
			SELECT * FROM tasks 
			WHERE listId = ?
		`;

		return new Promise((resolve, reject) => {
			this.database.all(GET_LIST_TASKS, [listId], (err, result) => {
				if (err) {
					console.log(err);
				} else {
					resolve(result);
				}
			});
		});
	}
}

export default Todo;