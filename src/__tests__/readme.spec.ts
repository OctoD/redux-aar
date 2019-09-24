import * as redux from "redux";
import aar from "..";

describe("tests the example in the readme 🐧", () => {
  test("todo app example", () => {
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
    const createAction = aar.prefix("todos");
    const add = createAction<ITask>("add");
    const complete = createAction<number>("complete");
    const remove = createAction<number>("remove");
    const update = createAction<IUpdateTask>("update");

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
        return { todos: state.todos.filter((_, i) => i !== index) };
      })
      .on(update, (state, todo) => {
        const todos = state.todos.slice();

        todos[todo.index] = todo.task;

        return { todos };
      });

    const store = redux.createStore(
      redux.combineReducers({
        todos: reducer.reduce()
      })
    );

    store.dispatch(add({ name: "foo" }));
    store.dispatch(add({ name: "bar" }));
    store.dispatch(add({ name: "baz" }));

    expect(store.getState().todos.todos.length).toBe(3);

    store.dispatch(remove(1));

    expect(store.getState().todos.todos.length).toBe(2);
    expect(store.getState().todos.todos[1]).toStrictEqual({ name: "baz" });

    store.dispatch(update({ index: 0, task: { name: "helloworld" } }));

    expect(store.getState().todos.todos[0]).toStrictEqual({
      name: "helloworld"
    });

    store.dispatch(complete(0));

    expect(store.getState().todos.todos[0].done).toBeTruthy();
  });
});
