import * as redux from "redux";
import * as aar from "..";

describe(`redux-aar`, () => {
  test(aar.createAction.name, () => {
    const actionname = "test";
    const action = aar.createAction(actionname);

    expect(action).toHaveProperty("type");
    expect(action.type).toBe(actionname);
    expect(typeof action).toBe("function");
    expect(action().payload).toBeUndefined();
    expect(action().type).toBe(actionname);
  });

  test(aar.prefix.name, () => {
    const prefixname = "foo";
    const actionname = "bar";
    const createAction = aar.prefix(prefixname);
    const action = createAction<number>(actionname);
    const prefixedActionName = [prefixname, actionname].join("::");

    expect(action.type).toBe(prefixedActionName);
    expect(action(10).payload).toBe(10);
    expect(action(10).type).toBe(prefixedActionName);
  });

  test(aar.createReducer.name, () => {
    const getInitialState = () => ({ foo: "bar" });
    const reducer = aar.createReducer(getInitialState());
    const actionname = "helloworld";
    const action = aar.createAction<string>(actionname);

    reducer.on(action, (state, foo) => ({ ...state, foo }));

    const store = redux.createStore(
      redux.combineReducers({
        domain: reducer.reduce()
      })
    );

    store.dispatch(action("baz"));

    expect(store.getState().domain.foo).toBe("baz");
  });
});
