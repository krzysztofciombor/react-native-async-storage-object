const DEFAULT_KEY_OPTIONS = {
  get: true,
  set: true,
  remove: true,
}

const DEFAULT_OPTIONS = {
  prefix: '',
}

function keyFor(prefix, prop) {
  return `${prefix}:${prop}`
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

function methodNameFactory(method, prop) {
  return `${method}${capitalize(prop)}`
}

function getterFactory(storage, prefix, prop) {
  return function() {
    return storage.getItem(keyFor(prefix, prop))
      .then(result => result && JSON.parse(result))
  }
}

function setterFactory(storage, prefix, prop) {
  return function(value) {
    return storage.setItem(keyFor(prefix, prop), JSON.stringify(value))
  }
}

function removerFactory(storage, prefix, prop) {
  return function() {
    return storage.removeItem(keyFor(prefix, prop))
  }
}

function getWithDefaults(options, defaultOptions) {
  return {...defaultOptions, ...options}
}

function isMethodDesired(keyOptions, methodName) {
  return !!keyOptions[methodName]
}

function appendMethodIfDesired(store, storage, key, keyOptions, methodName, methodFactory, prefix) {
  if (isMethodDesired(keyOptions, methodName)) {
    const fullMethodName = methodNameFactory(methodName, key)
    store[fullMethodName] = methodFactory(storage, prefix, key)
  }
  return store
}

export default function createASO(storage, storeProperties, options) {
  var Store = {}
  const { prefix } = getWithDefaults(options, DEFAULT_OPTIONS)
  for (var key in storeProperties) {
    const keyOptions = getWithDefaults(storeProperties[key], DEFAULT_KEY_OPTIONS)
    Store = appendMethodIfDesired(Store, storage, key, keyOptions, 'get', getterFactory, prefix)
    Store = appendMethodIfDesired(Store, storage, key, keyOptions, 'set', setterFactory, prefix)
    Store = appendMethodIfDesired(Store, storage, key, keyOptions, 'remove', removerFactory, prefix)
  }
  return Store
}

export function asoFactory(storage) {
  return function(storeProperties, options) {
    return createASO(storage, storeProperties, options)
  }
}

