import { describe, it, expect, beforeEach } from 'vitest'

import { useDeviceStore } from './device'
import { setActivePinia, createPinia } from 'pinia'

describe('Device store', () => {
  let store: ReturnType<typeof useDeviceStore>
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
    store = useDeviceStore()
  })

  it('should return mobile for screenWidth less than mobile breakpoint', async () => {
    global.innerWidth = 600 // Mock screen width
    expect(store.getDeviceType()).toBe('mobile')
    await store.updateDevice()
    expect(store.$state.deviceType).toBe('mobile')
  })

  it('should return tablet for screenWidth less than tablet breakpoint', async () => {
    global.innerWidth = 700
    expect(store.getDeviceType()).toBe('tablet')
    await store.updateDevice()
    expect(store.$state.deviceType).toBe('tablet')
  })

  it('should return desktop for screenWidth less than desktop breakpoint', async () => {
    global.innerWidth = 1000
    expect(store.getDeviceType()).toBe('desktop')
    await store.updateDevice()
    expect(store.$state.deviceType).toBe('desktop')
  })
})
