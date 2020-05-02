/* eslint-disable no-unused-vars */
import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import Loading from '@/components/Loading'
import Stepper from '@/components/new_order/Stepper.vue'
import ItemList from '@/components/new_order/ItemList.vue'
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.component('Loading', Loading)

describe('Component Stepper', () => {
  let store
  let factory
  let router
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
        router
      })
    }
  })
  it('Verifica se aperece o título do step se for mobile', () => {
    const wrapper = factory(Stepper, {
      isMobile: true
    })
    expect(wrapper.find('h1').exists()).eq(true)
  })
  it('Verifica se esconde o título do step se não for mobile', () => {
    const wrapper = factory(Stepper, {
      isMobile: false
    })
    expect(wrapper.find('h1').exists()).eq(false)
  })
  describe('Verificações nas steps', () => {
    let wrapper
    let leftBtn
    let rightBtn

    describe('Step 1', () => {
      beforeEach(() => {
        wrapper = factory(Stepper, {
          isMobile: false,
          step: 1
        })
        leftBtn = wrapper.find({ ref: 'leftBtn' })
        rightBtn = wrapper.find({ ref: 'rightBtn' })
      })

      it('Ao clicar em um item da lista, preencher o formulário corretamente', async () => {
        await wrapper.vm.$nextTick()
        const list = wrapper.findAll(ItemList).at(0)
        expect(list.exists()).eq(true)
        const obj = list.vm.items[0]
        list.vm.selected = obj
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.form.size).eq(obj)
      })

      it('Botão "anterior" bloqueado e "pŕoximo" liberado', () => {
        expect(leftBtn.vm.disabled).eq(true)
        expect(rightBtn.vm.disabled).eq(false)
      })
      it('Mostrar notificação de erro ao tentar avançar sem escolher opção', async () => {
        await rightBtn.trigger('click')
        expect(wrapper.vm.step).eq(1)
        expect(wrapper.vm.$store.state.notification.show).eq(true)
      })
      it('Sucesso ao clicar em "próximo" após ter escolhido um item', async () => {
        wrapper.vm.form.size = {}
        await rightBtn.trigger('click')
        expect(wrapper.vm.step).eq(2)
      })
    })
    describe('Step 2', () => {
      beforeEach(async () => {
        wrapper = factory(Stepper, {
          isMobile: false,
          step: 2
        })
        leftBtn = wrapper.find({ ref: 'leftBtn' })
        rightBtn = wrapper.find({ ref: 'rightBtn' })
      })
      it('Ao clicar em um item da lista, preencher o formulário corretamente', async () => {
        await wrapper.vm.$nextTick()
        const list = wrapper.findAll(ItemList).at(1)
        expect(list.exists()).eq(true)
        const obj = list.vm.items[0]
        list.vm.selected = obj
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.form.flavor).eq(obj)
      })
      it('Botão "anterior" liberado e "próximo" liberado', () => {
        expect(leftBtn.vm.disabled).eq(false)
        expect(rightBtn.vm.disabled).eq(false)
      })
      it('Mostrar notificação de erro ao tentar avançar sem escolher opção', async () => {
        await rightBtn.trigger('click')
        expect(wrapper.vm.step).eq(2)
        expect(wrapper.vm.$store.state.notification.show).eq(true)
      })
      it('Sucesso ao clicar em "próximo" após ter escolhido um item', async () => {
        wrapper.vm.form.flavor = {}
        await rightBtn.trigger('click')
        expect(wrapper.vm.step).eq(3)
      })
      it('Voltar à página anterior ao clicar no botão "anterior"', async () => {
        await leftBtn.trigger('click')
        expect(wrapper.vm.step).eq(1)
      })
    })
    describe('Step 3', () => {
      let makeOrderBtn
      beforeEach(() => {
        wrapper = factory(Stepper, {
          isMobile: false,
          step: 3
        })
        leftBtn = wrapper.find({ ref: 'leftBtn' })
        rightBtn = wrapper.find({ ref: 'rightBtn' })
        makeOrderBtn = wrapper.find({ ref: 'makeOrderBtn' })
        // list = wrapper.find(ItemList)
      })
      it('Ao clicar em um item da lista, preencher o formulário corretamente', async () => {
        await wrapper.vm.$nextTick()
        const list = wrapper.findAll(ItemList).at(2)
        expect(list.exists()).eq(true)

        const obj = [list.vm.items[0]]
        list.vm.selected = obj
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.form.customizations).eq(obj)
      })
      it('Botão "anterior" liberado e "próximo" bloqueado', () => {
        expect(leftBtn.vm.disabled).eq(false)
        expect(rightBtn.vm.disabled).eq(true)
      })

      it('Enviar pedido para o servidor', async () => {
        await makeOrderBtn.trigger('click')
        expect(wrapper.vm.$store.state.notification.show).eq(true)
      })
      it('Voltar à página anterior ao clicar no botão "anterior"', async () => {
        await leftBtn.trigger('click')
        expect(wrapper.vm.step).eq(2)
      })
    })
  })
})
