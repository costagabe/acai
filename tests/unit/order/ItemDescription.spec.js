import { expect } from 'chai'
import ItemDescription from '@/components/order/ItemDescription.vue'
import factory from '../utils/Factory'

const item = {
  description: 'test',
  cost: 3
}
const title = 'Test'
describe('Component Order/ItemDescription', () => {
  let wrapper
  beforeEach(() => {
    wrapper = factory(ItemDescription, {}, { propsData: { item, title } })
  })
  it('O componente está sendo renderizado e mostrando informações corretamente', async () => {
    const row = wrapper.find('v-row-stub')
    expect(row.element.innerHTML.includes(`${title} ${item.description}`)).eq(true)
    expect(row.element.innerHTML.includes(`R$ ${item.cost},00`)).eq(true)
  })
})
