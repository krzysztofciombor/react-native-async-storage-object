# React Native Async Storage Object Helper

This is a utility helper for easy `AsyncStorage` objects creation.

## Async Storage Object

Async Storage Object (ASO) serves as an interface for interacting with Async Storage.
It is defined as an object that can have different properties, each property with its own:
* get method
* set method
* remove method

These objects abstract the interaction with the underlying Async Storage and expose a simpler interface.

### Example

A simple object for storing a boolean variable inside Async Storage may look like:
```js
const UserStore = {
  setUserLoggedIn(isUserLoggedIn),
  getUserLoggedIn(),
  removeUserLoggedIn(),
}
```

### Motivation

The benefits of using ASO objects instead of accessing AsyncStorage directly are as follows:
* One does not have to worry about keeping keys consistent across get/set/remove methods
* Accessing non-existent key will throw `undefined is not a function` rather than result in undefined object being returned
* Accessing Async Storage may be restricted to get-only object to enforce immutability


## ASO Helper

This library exposes one method: `createASO` which facilitates creating ASO.
```js
function createASO(storage: Storage, storeProperties: Object, options: Object): Store
```

where `storage` is an Object that exposes the same interface as AsyncStorage (for potential extension point),
`storeProperties` is an object containing the desired store properties.
Each property is described by three boolean valued indicating if a corresponding method
should be generated within the store:
```js
property = {
  get: Boolean,
  set: Boolean,
  remove: Boolean
}
```

Additional options can be passed in `options` object:
```js
options = {
  prefix: String? // an additional prefix string that will be prepended to the objects saved within AsyncStorage.
}
```

One can also use a `asoFactory(storage: Storage)` which provides a curried version of `createASO` that will always use a given storage, for example:
```js
const asyncStorageHelper = asoFactory(AsyncStorage)
```

### Example

```js
const userStore = createASO({
  userLoggedIn: {
    get: true,
    set: true,
    remove: true,
  }
})
```
will generate the same store as seen in ASO Example section:
```js
userStore.setUserLoggedIn(true)
userStore.getUserLoggedIn()
  .then(userLoggedIn => console.log(userLoggedIn))
userStore.removeUserLoggedIn()
```
