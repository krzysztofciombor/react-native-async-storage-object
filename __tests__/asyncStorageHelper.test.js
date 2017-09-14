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

