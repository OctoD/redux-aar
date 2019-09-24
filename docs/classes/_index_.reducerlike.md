[redux-aar](../README.md) › ["index"](../modules/_index_.md) › [ReducerLike](_index_.reducerlike.md)

# Class: ReducerLike <**InitialState**>

## Type parameters

▪ **InitialState**

## Hierarchy

* **ReducerLike**

## Implements

* [IReducerLike](../interfaces/_index_.ireducerlike.md)‹InitialState›

## Index

### Constructors

* [constructor](_index_.reducerlike.md#constructor)

### Properties

* [initialState](_index_.reducerlike.md#protected-initialstate)
* [subscribedMappers](_index_.reducerlike.md#protected-subscribedmappers)

### Methods

* [on](_index_.reducerlike.md#on)
* [reduce](_index_.reducerlike.md#reduce)

## Constructors

###  constructor

\+ **new ReducerLike**(`initialState`: InitialState): *[ReducerLike](_index_.reducerlike.md)*

*Defined in [index.ts:90](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`initialState` | InitialState |

**Returns:** *[ReducerLike](_index_.reducerlike.md)*

## Properties

### `Protected` initialState

• **initialState**: *InitialState*

*Defined in [index.ts:92](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L92)*

___

### `Protected` subscribedMappers

• **subscribedMappers**: *Map‹string, [ReducerMapperFn](../modules/_index_.md#reducermapperfn)‹InitialState, any››* =  new Map()

*Defined in [index.ts:87](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L87)*

## Methods

###  on

▸ **on**<**T**>(`action`: [ActionCreatorReturn](../modules/_index_.md#actioncreatorreturn)‹T›, `mapper`: [ReducerMapperFn](../modules/_index_.md#reducermapperfn)‹InitialState, T›): *[IReducerLike](../interfaces/_index_.ireducerlike.md)‹InitialState›*

*Implementation of [IReducerLike](../interfaces/_index_.ireducerlike.md)*

*Defined in [index.ts:94](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L94)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`action` | [ActionCreatorReturn](../modules/_index_.md#actioncreatorreturn)‹T› |
`mapper` | [ReducerMapperFn](../modules/_index_.md#reducermapperfn)‹InitialState, T› |

**Returns:** *[IReducerLike](../interfaces/_index_.ireducerlike.md)‹InitialState›*

___

###  reduce

▸ **reduce**(): *Reducer‹InitialState›*

*Implementation of [IReducerLike](../interfaces/_index_.ireducerlike.md)*

*Defined in [index.ts:102](https://github.com/OctoD/redux-aar/blob/085891c/src/index.ts#L102)*

**Returns:** *Reducer‹InitialState›*
