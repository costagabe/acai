import { expect } from 'chai'
import factory from './utils/Factory'
import Snackbar from '@/components/Snackbar.vue'

describe('Component Snackbar', () => {
  let wrapper
  beforeEach(() => {
    wrapper = factory(Snackbar)
  })
  it('Lista está sendo renderizada corretamente', async () => {
    const msg = 'test'
    wrapper.vm.$store.state.notification.show = true
    wrapper.vm.$store.state.notification.content = msg
    await wrapper.vm.$nextTick()
    expect(wrapper.find('v-snackbar-stub').element.innerHTML.includes(msg)).eq(true)
  })
})
