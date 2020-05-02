/* eslint-disable no-unused-vars */
import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import ItemList from '@/components/new_order/ItemList.vue'
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
const items = [
  {
    id: 0,
    description: 'test',
    cost: 1
  }
]
describe('Component Stepper', () => {
  let store
  let factory
  let router
  let wrapper
  beforeEach(() => {
    router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes: []
    })
    store = new Vuex.Store({
      state: () => ({
        customizations: [{ id: 3 }],
        flavors: [],
        loading: false,
        notification: {
          show: false,
          color: ''
        },
        orders: [{ id: 2 }],
        sizes: [{ id: 1 }]
      }),
      mutations: {
        setLoading (state, payload) {
          state.loading = payload
        }
      },
      actions: {
        enviarPedido ({ state }) {
          state.notification.show = true
          return { data: { id: 1 } }
        },
        initItems ({ commit }) {
          commit('setLoading', false)
          setTimeout(() => {
            commit('setLoading', false)
          }, 200)
        }
      }
    })
    factory = (component, values = {}) => {
      return shallowMount(component, {
        data () {
          return {
            isMobile: false,
            ...values,
            form: { size: null, flavor: null, customizations: null },
            stepper: {
              titles: ['Tamanho', 'Sabor', 'Adicionais'],
              pages: [
                { items: [], form: '' },
                { items: [], form: '' },
                { items: [], form: '' }
              ]
            }
          }
        },
        methods: {
          showNotification () {
            this.$store.state.notification.show = true
          }
        },
        store,
        localVue,
        router,
        propsData: { items }
      })
    }
    wrapper = factory(ItemList, {
      isMobile: false,
      step: 1
    })
  })
  it('Lista está sendo renderizada', async () => {
    const lines = wrapper.findAll('.v-list-item')
    console.log(wrapper.findAll('.v-list-item').at(0).html())
    expect(lines.length).eq(items.length)
    expect(lines.at(0).html()).include('test')
    expect(lines.at(0).html()).include('R$ 1,00')
  })
})
