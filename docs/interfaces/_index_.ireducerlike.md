[redux-aar](../README.md) › ["index"](../modules/_index_.md) › [IReducerLike](_index_.ireducerlike.md)

# Interface: IReducerLike <**InitialState**>

## Type parameters

▪ **InitialState**

## Hierarchy

* **IReducerLike**

## Implemented by

* [ReducerLike](../classes/_index_.reducerlike.md)

## Index

### Methods

* [on](_index_.ireducerlike.md#on)
* [reduce](_index_.ireducerlike.md#reduce)

## Methods

###  on

▸ **on**<**T**>(`action`: [ActionCreatorReturn](../modules/_index_.md#actioncreatorreturn)‹T›, `mapper`: [ReducerMapperFn](../modules/_index_.md#reducermapperfn)‹InitialState, T›): *[IReducerLike](_index_.ireducerlike.md)‹InitialState›*

*Defined in [index.ts:42](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L42)*

Binds a reducing function to an action. The function will be invoked only if the bound action is dispatched.

```ts
import * as reduxaar from 'redux-aar';

const update = reduxaar.createAction<number>('update');
const update = reduxaar.createAction('reset');
const initialState = () => ({ counter: 0 });
const reducer = createReducer(initialState());

reducer
   .on(reset, initialState)
   .on(update, (state, counter) => ({ counter }))
;
```

**`template`** T

**`memberof`** IReducerLike

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`action` | [ActionCreatorReturn](../modules/_index_.md#actioncreatorreturn)‹T› |
`mapper` | [ReducerMapperFn](../modules/_index_.md#reducermapperfn)‹InitialState, T› |

**Returns:** *[IReducerLike](_index_.ireducerlike.md)‹InitialState›*

___

###  reduce

▸ **reduce**(): *Reducer‹InitialState›*

*Defined in [index.ts:83](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L83)*

Returns a valid `Reducer<InitialState>` for redux `combineReducers` function.

```ts
// counter.ts
import * as reduxaar from 'redux-aar';

const decrease = reduxaar.createAction('decrease');
const increase = reduxaar.createAction('increase');
const initialState = () => ({ counter: 0 });
const reducer = createReducer(initialState());

reducer
   .on(decrease, state => ({ counter: state.counter-- }))
   .on(increase, state => ({ counter: state.counter++ }))
;

export default reducer.reduce();

// store.ts
import * as redux from 'redux';
import counter from './counter';

const store = redux.createStore(
   redux.combineReducers(
     {
       counter,
     }
   )
);

export default store;
```

**`memberof`** IReducerLike

**Returns:** *Reducer‹InitialState›*
