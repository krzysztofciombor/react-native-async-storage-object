class MockStorage {
  constructor() {
    this.storage = {}
  }

  getItem(key) {
    return new Promise((resolve, reject) => {
      return resolve(this.storage[key])
    })
  }

  setItem(key, item) {
    return new Promise((resolve, reject) => {
      this.storage[key] = item
      return resolve()
    })
  }

  removeItem(key) {
    return new Promise((resolve, reject) => {
      delete this.storage[key]
      return resolve()
    })
  }
}

const mockStorage = new MockStorage()

export default mockStorage

