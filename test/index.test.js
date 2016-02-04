import should from 'should'
import C from '../'


const oo  = Object.assign(Object.create(null), { z: 'yupp' })
const arr = [1, 2, 'nope']
const fn  = v => v + 1
const o   = Object.assign(Object.create(null), {
  a: 10,
  b: -10.123,
  c: 'omg what',
  d: arr,
  e: oo,
  f: fn
})
const m   = new Map([
  ['a', 10],
  ['b', -10.123],
  ['c', 'omg what'],
  ['d', arr],
  ['e', oo],
  ['f', fn]
])

describe('template-to-collection', () => {
  describe('#createObject', () => {
    it('should create an Object with it\'s prototype as null', () => {
      const o1 = C.Obj`a ${10} b ${-10.123} c ${'omg what'} d ${[1, 2, 'nope']} e ${oo} f ${fn}`

      should(Object.getPrototypeOf(o1)).eql(null)
      Object.keys(o1).should.deepEqual(Object.keys(o))
      should(o1).deepEqual(o)
    })
  })
  describe('#createMap', () => {
    it('should create a Map with given keys & values', () => {
      const m1   = C.Map`a ${10} b ${-10.123} c ${'omg what'} d ${[1, 2, 'nope']} e ${oo} f ${fn}`
      const keys = m1.keys()
      const t    = [...keys]

      should(m1 instanceof Map).eql(true)
      m1.size.should.eql(6)
      should(t).deepEqual(['a', 'b', 'c', 'd', 'e', 'f'])

      for (const key of keys) should(m1.get(key)).deepEqual(m.get(key))
    })
  })
  describe('#createWeakMap', () => {
    it('should create a WeakMap', () => {
      const wm1 = C.WMap`${o} ${'something'} ${oo} ${-2} ${fn} ${o}`

      should(wm1 instanceof WeakMap).eql(true)
      wm1.get(o).should.eql('something')
      wm1.get(oo).should.eql(-2)
      should(wm1.get(fn)).deepEqual(o)
    })
  })
})
