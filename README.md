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

## ASO Helper

This library exposes one method: `createASO` which facilitates creating ASO.
```js
function createASO(storeProperties: Object, options: Object): Store
```

where `storeProperties` is an object containing the desired store properties.
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

