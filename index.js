'use strict'

function anyKeysAsStrings(arrOfKeys) {
  return arrOfKeys.join('').replace(/\s/g, '').length
}

function Obj(strKeys, ...vals) {
  let o = Object.create(null)
  const keysAsStrings = anyKeysAsStrings(strKeys)

  if (!keysAsStrings) {
    for (let i = 0; i < vals.length; i++) o[vals[i]] = vals[++i]
  }
  else {
    // as many properties as there are keys
    // if no of keys > no of values then those keys
    // are initialized to undefined
    // Also, iterating to element before last as last element
    // is usually extra
    for (let i = 0; i < strKeys.length - 1; i++) o[strKeys[i].trim()] = vals[i]
  }

  return o
}

function _createMaps(Constructor, strKeys, vals) {
  let m = new Constructor()
  const keysAsStrings = anyKeysAsStrings(strKeys)

  if (!keysAsStrings) {
    for (let i = 0; i < vals.length; i++) m.set(vals[i], vals[++i])
  }
  else {
    for (let i = 0; i < strKeys.length - 1; i++) m.set(strKeys[i].trim(), vals[i])
  }

  return m
}

function createMap(strKeys, ...vals) {
  return _createMaps(Map, strKeys, vals)
}

function createWMap(strKeys, ...vals) {
  return _createMaps(WeakMap, strKeys, vals)
}

/*

x = Obj`${'int'} ${100}
${'fn'} ${v => v + 1}
${'float'} ${-10.123123}
${'str'} ${'omgwtfbbq mate'}`

y = Obj`int ${100} float ${1002.12} fn ${v => v.map(x => ++x)}`

*/


module.exports = {
  Obj,
  Map: createMap,
  WMap: createWMap
}
