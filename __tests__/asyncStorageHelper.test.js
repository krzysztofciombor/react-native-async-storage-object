/* eslint-env jest */

const createStore = require('../asyncStorageHelper')

test('createStore returns store with appropriate methods', () => {
  const store = createStore({
    test: {
      get: true,
      set: true,
      remove: true,
    }
  })

  expect(store.getTest).toBeDefined()
})
