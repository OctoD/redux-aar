import { Action as ReduxAction, Reducer } from "redux";

export type Action<T = any> = ReduxAction<string> & { payload: T };

export type ActionCreatorReturn<T> = (T extends undefined
  ? EmptyActionFn
  : T extends boolean
  ? T extends null
    ? ActionFn<null>
    : ActionFn<boolean>
  : ActionFn<T>) &
  ReduxAction<string>;

export type ActionFn<T> = (payload: T) => Action<T>;

export type EmptyActionFn = () => Action;

export type EmptyAction = ReduxAction<string>;

export type ReducerMapperFn<S, P> = (state: S, payload: P) => S;

export interface IReducerLike<InitialState> {
  /**
   * Binds a reducing function to an action. The function will be invoked only if the bound action is dispatched.
   *
   * ```ts
   * import * as reduxaar from 'redux-aar';
   *
   * const update = reduxaar.createAction<number>('update');
   * const update = reduxaar.createAction('reset');
   * const initialState = () => ({ counter: 0 });
   * const reducer = createReducer(initialState());
   *
   * reducer
   *    .on(reset, initialState)
   *    .on(update, (state, counter) => ({ counter }))
   * ;
   * ```
   *
   * @template T
   * @param {ActionCreatorReturn<T>} action
   * @param {ReducerMapperFn<InitialState, T>} mapper
   * @returns {IReducerLike<T>}
   * @memberof IReducerLike
   */
  on<T>(
    action: ActionCreatorReturn<T>,
    mapper: ReducerMapperFn<InitialState, T>
  ): IReducerLike<InitialState>;
  /**
   * Returns a valid `Reducer<InitialState>` for redux `combineReducers` function.
   *
   * ```ts
   * // counter.ts
   * import * as reduxaar from 'redux-aar';
   *
   * const decrease = reduxaar.createAction('decrease');
   * const increase = reduxaar.createAction('increase');
   * const initialState = () => ({ counter: 0 });
   * const reducer = createReducer(initialState());
   *
   * reducer
   *    .on(decrease, state => ({ counter: state.counter-- }))
   *    .on(increase, state => ({ counter: state.counter++ }))
   * ;
   *
   * export default reducer.reduce();
   *
   * // store.ts
   * import * as redux from 'redux';
   * import counter from './counter';
   *
   * const store = redux.createStore(
   *    redux.combineReducers(
   *      {
   *        counter,
   *      }
   *    )
   * );
   *
   * export default store;
   * ```
   *
   * @returns {Reducer<InitialState>}
   * @memberof IReducerLike
   */
  reduce(): Reducer<InitialState>;
}

class ReducerLike<InitialState> implements IReducerLike<InitialState> {
  protected subscribedMappers: Map<
    string,
    ReducerMapperFn<InitialState, any>
  > = new Map();

  public constructor(protected readonly initialState: InitialState) {}

  public on<T>(
    action: ActionCreatorReturn<T>,
    mapper: ReducerMapperFn<InitialState, T>
  ): IReducerLike<InitialState> {
    this.subscribedMappers.set(action.type, mapper);
    return this as any;
  }

  public reduce(): Reducer<InitialState> {
    return (state: InitialState = this.initialState, action): InitialState => {
      if (this.subscribedMappers.has(action.type)) {
        return this.subscribedMappers.get(action.type)!(state, action.payload);
      }

      return state;
    };
  }
}

/**
 * Creates an action. If the type `T` is specified, it will return `ActionFn<T>` otherwise `EmptyActionFn`.
 *
 * ```ts
 * const reset = createAction('reset');
 * const setName = createAction<string>('setName');
 *
 * dispatch(reset());
 * dispatch(setName('foobarbaz'));
 * ```
 *
 * @export
 * @template T
 * @param {string} type
 * @returns {ActionCreatorReturn<T>}
 */
export function createAction<T = undefined>(
  type: string
): ActionCreatorReturn<T> {
  function action(payload: T): Action<T> {
    return {
      payload,
      type
    };
  }

  action.type = type;

  return action as any;
}

/**
 * Creates a reducer. A Reducer handles all mutations to a state when some actions are dispatched.
 * It takes only one argument which is the initial state to mutate.
 * To use a created reducer in redux, you have to use the method `reduce` with redux's `combineReducer` function.
 *
 * ```ts
 * import { createReducer } from 'redux-aar';
 *
 * const initialState = () => ({ counter: 0 });
 * const reducer = createReducer(initialState());
 *
 * export default reducer.reduce();
 * ```
 *
 * @export
 * @template S
 * @param {S} initialState
 * @returns {IReducerLike<InitialState>}
 */
export function createReducer<S>(initialState: S): IReducerLike<S> {
  return new ReducerLike(initialState);
}

/**
 * Creates a prefix and returns a `createAction` function.
 * This is useful if you want to scope all your actions under a given prefix.
 * Use this if you are writing a domain driven store.
 *
 * ```ts
 * const createAction = prefix('user');
 *
 * const reset = createAction('reset');
 * const setName = createAction<string>('setName');
 *
 * reset().type // 'user::reset'
 * setName('lorem ipsum').type // 'user::setName'
 * ```
 *
 * @export
 * @param {string} prefix
 * @returns {typeof createAction}
 */
export function prefix(prefix: string): typeof createAction {
  return <T = undefined>(type: string) => createAction<T>(`${prefix}::${type}`);
}

export default {
  createAction,
  createReducer,
  prefix
};
