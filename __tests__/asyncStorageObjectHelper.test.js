/* eslint-env jest */

import createASO from '../src/asyncStorageObjectHelper'

test('createASO returns store with appropriate methods', () => {
  const store = createASO({
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

test('createASO respects false for methods', () => {
  const store = createASO({
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

test('createASO methods work correctly', () => {
  const store = createASO({
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

test('createASO sets defaults to true', () => {
  const store = createASO({
    test,
  })

  expect(store.getTest).toBeDefined()
  expect(store.setTest).toBeDefined()
  expect(store.removeTest).toBeDefined()
})

test('createASO works for objects', () => {
  const store = createASO({
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

