import createASO from './asyncStorageObjectHelper'
import storage from './mockStorageProvider'

const OnboardingStore = createASO(storage, {
  onboardingCompleted: {
    get: true,
    set: true,
    remove: true,
  },
}, {
  prefix: '@@OnboardingStore',
})

console.log(OnboardingStore)
OnboardingStore.setOnboardingCompleted(true)
OnboardingStore.getOnboardingCompleted()
  .then(res => console.log(res))
