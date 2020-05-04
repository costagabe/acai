import { expect } from 'chai'
import factory from '../utils/Factory'
import ItemList from '@/components/new_order/ItemList.vue'

const items = [
  {
    id: 0,
    description: 'test',
    cost: 1
  }
]
describe('Component NewOrder/ItemList', () => {
  let wrapper
  beforeEach(() => {
    wrapper = factory(ItemList, {}, { propsData: { items } })
  })
  it('Lista está sendo renderizada corretamente', async () => {
    const lines = wrapper.findAll('.v-list-item')
    expect(lines.length).eq(items.length)
    expect(lines.at(0).html()).include(`${items[0].description}`)
    expect(lines.at(0).html()).include(`R$ ${items[0].cost},00`)
  })
})
