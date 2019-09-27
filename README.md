redux aar
=========

Actions creator and reducers utilities for redux

# ⚙ Install

```bash
# npm
npm i redux-aar

# yarn
yarn add redux-aar
```

# 📖 Docs

You can read docs [here](./docs/README.md), just remember to run your `npm run docs` script.

# 🔍 Usage

A todo example

```ts
import * as aar from 'redux-aar';

interface ITask {
  done?: boolean;
  name: string;
}

interface IUpdateTask {
  index: number;
  task: ITask;
}

interface IState {
  todos: ITask[];
}

const initialState = (): IState => ({ todos: [] });
const createAction = aar.prefix('todos');
const add = createAction<ITask>('add');
const complete = createAction<number>('complete');
const remove = createAction<number>('remove');
const update = createAction<IUpdateTask>('update');

const reducer = aar.createReducer(initialState());

reducer
  .on(add, (state, todo) => {
    return { todos: state.todos.slice().concat(todo) };
  })
  .on(complete, (state, index) => {
    const todos = state.todos.slice();
    const todo = state.todos.slice()[index];

    todo.done = true;

    return { todos };
  })
  .on(remove, (state, index) => {
    return { todos: state.todos.filter((_, i) => i !== index) }
  })
  .on(update, (state, todo) => {
    const todos = state.todos.slice();

    todos[todo.index] = todo.task;

    return { todos };
  })
;

const store = redux.createStore(redux.combineReducers({
  todos: reducer.reduce(),
}));

store.dispatch(add({ name: 'foo' })); // todos length is 1
store.dispatch(add({ name: 'bar' })); // todos length is 2
store.dispatch(add({ name: 'baz' })); // todos length is 3

store.dispatch(remove(1)); // removes task { name: 'bar' };

store.dispatch(update({ index: 0, task: { name: 'helloworld' } }));  // task at index 0 is { name: 'helloworld' };

store.dispatch(complete(0)); // task at index 0 is { name: 'helloworld', completed: true };
```

# ️❤️ Contributing

Every contribution is really welcome!

If you feel that something can be improved or should be fixed, feel free to open an issue with the feature or the bug found.

If you want to fork and open a pull request (adding features or fixes), feel free to do it. Remember only to use the `dev` branch as a base.

Read the [contributing guidelines](./CONTRIBUTING.md)

# 📃 Licence

Read the [licence](./LICENCE)
