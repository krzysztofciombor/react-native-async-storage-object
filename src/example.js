import createASO from './asyncStorageObjectHelper'

const OnboardingStore = createASO({
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
