# template-to-collection
[![Build Status](https://travis-ci.org/zeusdeux/template-to-collection.svg?branch=master)](https://travis-ci.org/zeusdeux/template-to-collection)

Object, Map and WeakMap creation sugar using tagged template strings.

## Installation

```javascript
npm install template-to-collection
```

> Node: The source is written in ES2015. It should fit right into your transpilation pipeline.

## Usage

### Creating an `Object` with `null` prototype

#### `Obj` tag

```javascript
import C from 'template-to-collection'

let obj = C.Obj`a ${10} b ${'what'} fn ${v => v + 10}`

// will create {a: 10, b: 10, fn: [Function]} whose __proto__ will be `null`
```

### Creating a `Map`

#### `Map` tag

```javascript
import C from 'template-to-collection'

let map = C.Map`a ${10} b ${'what'} fn ${v => v + 10}`

// will create Map { 'a' => 10, 'fn' => [Function], 'b' => 'what' }
```

### Creating a `WeakMap`

#### `WMap` tag

```javascript
import C from 'template-to-collection'

let key = {a: 200}
let wmap = C.WMap`${key} ${10}`

// will create a WeakMap where wmap.has(key) === true
```
