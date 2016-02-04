'use strict'

/*
 * Return true if there are any non-empty strings in the array
 */
const anyKeysAsStrings = arrOfKeys => !!arrOfKeys.join('').replace(/\s/g, '').length

/*
 * Create the "right" kind of Object
 */
const createObject = (strKeys, ...vals) => {
  let o = Object.create(null)
  const keysAsStrings = anyKeysAsStrings(strKeys)

  if (!keysAsStrings)
    for (let i = 0; i < vals.length; i++) o[vals[i]] = vals[++i]
  else
    for (let i = 0; i < strKeys.length - 1; i++) o[strKeys[i].trim()] = vals[i]

  return o
}

/*
 * Create Map or WeakMap
 */
const _createMaps = (Constructor, strKeys, vals) => {
  let m = new Constructor()
  const keysAsStrings = anyKeysAsStrings(strKeys)

  if (!keysAsStrings)
    for (let i = 0; i < vals.length; i++) m.set(vals[i], vals[++i])
  else
    for (let i = 0; i < strKeys.length - 1; i++) m.set(strKeys[i].trim(), vals[i])

  return m
}

/*
 * Sugar to create Map
 */
const createMap = (strKeys, ...vals) => _createMaps(Map, strKeys, vals)

/*
 * Sugar to create WeakMap
 */
const createWMap = (strKeys, ...vals) => _createMaps(WeakMap, strKeys, vals)


module.exports = {
  Obj: createObject,
  Map: createMap,
  WMap: createWMap
}
