/* eslint-env jest */

import createStore from '../src/asyncStorageHelper'

test('createStore returns store with appropriate methods', () => {
  const store = createStore({
    test: {
      get: true,
      set: true,
      remove: true,
    }
  })

  expect(store.getTest).toBeDefined()
  expect(store.setTest).toBeDefined()
  expect(store.removeTest).toBeDefined()
})

test('createStore respects false for methods', () => {
  const store = createStore({
    test: {
      get: false,
      set: false,
      remove: false,
    }
  })

  expect(store.getTest).toBeUndefined()
  expect(store.setTest).toBeUndefined()
  expect(store.removeTest).toBeUndefined()
})

test('createStore methods work correctly', () => {
  const store = createStore({
    test: {
      get: true,
      set: true,
      remove: true,
    }
  })

  expect(store.getTest()).resolves.toBeUndefined()

  store.setTest(true)
  expect(store.getTest()).resolves.toEqual(true)

  store.removeTest()
  expect(store.getTest()).resolves.toBeUndefined()
})

test('createStore sets defaults to true', () => {
  const store = createStore({
    test,
  })

  expect(store.getTest).toBeDefined()
  expect(store.setTest).toBeDefined()
  expect(store.removeTest).toBeDefined()
})

test('createStore works for objects', () => {
  const store = createStore({
    test,
  })

  const testObject = {
    stringProp: 'string',
    numProp: 123,
    nested: {
      foo: 'bar',
    },
  }
  store.setTest(testObject)

  expect(store.getTest()).resolves.toEqual(testObject)
})

