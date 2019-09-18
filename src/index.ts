import { Action as ReduxAction, Reducer } from "redux";

export type Action<T = any> = ReduxAction<string> & { payload: T };

export type ActionCreatorReturn<T> = (T extends undefined
  ? EmptyActionFn
  : ActionFn<T>) &
  ReduxAction<string>;

export type ActionFn<T> = (payload: T) => Action<T>;

export type EmptyActionFn = () => Action;

export type EmptyAction = ReduxAction<string>;

export type ReducerMapperFn<S, P> = (state: S, payload: P) => S;

export interface IReducerLike<InitialState> {
  on<T>(
    action: ActionCreatorReturn<T>,
    mapper: ReducerMapperFn<InitialState, T>
  ): IReducerLike<T>;
  reduce(): Reducer;
}

class ReducerLike<InitialState> implements IReducerLike<InitialState> {
  protected subscribedMappers: Map<
    string,
    ReducerMapperFn<InitialState, any>
  > = new Map();

  public constructor(protected readonly initialState: InitialState) {}

  /**
   *
   *
   * @template T
   * @param {ActionCreatorReturn<T>} action
   * @param {ReducerMapperFn<InitialState, T>} mapper
   * @returns {this}
   * @memberof ReducerLike
   */
  public on<T>(
    action: ActionCreatorReturn<T>,
    mapper: ReducerMapperFn<InitialState, T>
  ): IReducerLike<T> {
    this.subscribedMappers.set(action.type, mapper);
    return this as any;
  }

  /**
   *
   *
   * @returns {Reducer}
   * @memberof ReducerLike
   */
  public reduce(): Reducer {
    return (state: InitialState = this.initialState, action) => {
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
