[redux-aar](../README.md) › ["index"](_index_.md)

# External module: "index"

## Index

### Classes

* [ReducerLike](../classes/_index_.reducerlike.md)

### Interfaces

* [IReducerLike](../interfaces/_index_.ireducerlike.md)

### Type aliases

* [Action](_index_.md#action)
* [ActionCreatorReturn](_index_.md#actioncreatorreturn)
* [ActionFn](_index_.md#actionfn)
* [EmptyAction](_index_.md#emptyaction)
* [EmptyActionFn](_index_.md#emptyactionfn)
* [ReducerMapperFn](_index_.md#reducermapperfn)

### Functions

* [createAction](_index_.md#createaction)
* [createReducer](_index_.md#createreducer)
* [prefix](_index_.md#prefix)

## Type aliases

###  Action

Ƭ **Action**: *ReduxAction‹string› & object*

*Defined in [index.ts:3](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L3)*

___

###  ActionCreatorReturn

Ƭ **ActionCreatorReturn**: *T extends undefined ? EmptyActionFn : ActionFn<T> & ReduxAction‹string›*

*Defined in [index.ts:5](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L5)*

___

###  ActionFn

Ƭ **ActionFn**: *function*

*Defined in [index.ts:10](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L10)*

#### Type declaration:

▸ (`payload`: T): *[Action](_index_.md#action)‹T›*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | T |

___

###  EmptyAction

Ƭ **EmptyAction**: *ReduxAction‹string›*

*Defined in [index.ts:14](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L14)*

___

###  EmptyActionFn

Ƭ **EmptyActionFn**: *function*

*Defined in [index.ts:12](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L12)*

#### Type declaration:

▸ (): *[Action](_index_.md#action)*

___

###  ReducerMapperFn

Ƭ **ReducerMapperFn**: *function*

*Defined in [index.ts:16](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L16)*

#### Type declaration:

▸ (`state`: S, `payload`: P): *S*

**Parameters:**

Name | Type |
------ | ------ |
`state` | S |
`payload` | P |

## Functions

###  createAction

▸ **createAction**<**T**>(`type`: string): *[ActionCreatorReturn](_index_.md#actioncreatorreturn)‹T›*

*Defined in [index.ts:129](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L129)*

Creates an action. If the type `T` is specified, it will return `ActionFn<T>` otherwise `EmptyActionFn`.

```ts
const reset = createAction('reset');
const setName = createAction<string>('setName');

dispatch(reset());
dispatch(setName('foobarbaz'));
```

**`export`** 

**`template`** T

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |

**Returns:** *[ActionCreatorReturn](_index_.md#actioncreatorreturn)‹T›*

___

###  createReducer

▸ **createReducer**<**S**>(`initialState`: S): *[IReducerLike](../interfaces/_index_.ireducerlike.md)‹S›*

*Defined in [index.ts:163](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L163)*

Creates a reducer. A Reducer handles all mutations to a state when some actions are dispatched.
It takes only one argument which is the initial state to mutate.
To use a created reducer in redux, you have to use the method `reduce` with redux's `combineReducer` function.

```ts
import { createReducer } from 'redux-aar';

const initialState = () => ({ counter: 0 });
const reducer = createReducer(initialState());

export default reducer.reduce();
```

**`export`** 

**`template`** S

**Type parameters:**

▪ **S**

**Parameters:**

Name | Type |
------ | ------ |
`initialState` | S |

**Returns:** *[IReducerLike](../interfaces/_index_.ireducerlike.md)‹S›*

___

###  prefix

▸ **prefix**(`prefix`: string): *[createAction](_index_.md#createaction)*

*Defined in [index.ts:186](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L186)*

Creates a prefix and returns a `createAction` function.
This is useful if you want to scope all your actions under a given prefix.
Use this if you are writing a domain driven store.

```ts
const createAction = prefix('user');

const reset = createAction('reset');
const setName = createAction<string>('setName');

reset().type // 'user::reset'
setName('lorem ipsum').type // 'user::setName'
```

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`prefix` | string |

**Returns:** *[createAction](_index_.md#createaction)*
