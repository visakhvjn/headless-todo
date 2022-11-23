# Headless Todo Backend

A headless todo project that can be integrated with the front end applications. The project uses `sqlite3` which makes the database portable.

## Future Goals

Allow support for multiple databases.

## Usage

The module has 3 parts - `users`, `lists` and `tasks`

`users` - data of the users who will be adding the todo items <br>
`lists` - collection of tasks <br>
`tasks` - the actual items <br>

```
# Import the Todo module
import Todo from "./main.js";

# Initialize it
const todo = new Todo('./data/todo.db');

# create a user
await todo.addUser('username', 'pass', 'fullname'));

# fetch the created user
const user = await todo.fetchUser(1);

# create a list
await todo.createList('list 1', 'the first list', user.id);

# add multiple tasks to list 1
await todo.addTask('task1', 'task is one', 1);
await todo.addTask('task2', 'task is two', 1);
await todo.addTask('task3', 'task is three', 1);
await todo.addTask('task4', 'task is four', 1);

console.log(await todo.fetchListTasks(1));
```

Here is the sample output of the tasks

```
-------------------------------------------------------------------
[
  { id: 1, name: 'task1', description: 'task is one', listId: 1 },
  { id: 2, name: 'task2', description: 'task is two', listId: 1 },
  { id: 3, name: 'task3', description: 'task is three', listId: 1 },
  { id: 4, name: 'task4', description: 'task is four', listId: 1 },
]
```

For better visualizing the sqllite database you can use the SQLite extension [here](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite).
