import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axios'
import Order from '../models/Order'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: () => ({
    customizations: [],
    flavors: [],
    loading: false,
    notification: {
      show: false,
      color: 'yellow darken-3'
    },
    orders: [],
    sizes: []
  }),
  getters: {},
  mutations: {
    setCustomizations (state, payload) {
      state.customizations = payload
    },
    setFlavors (state, payload) {
      state.flavors = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setOrders (state, payload) {
      state.orders = payload
    },
    setSizes (state, payload) {
      state.sizes = payload
    }
  },
  actions: {
    async enviarPedido ({ commit }, form) {
      commit('setLoading', true)
      try {
        return await axios.post('/order', { ...form })
      } finally {
        commit('setLoading', false)
      }
    },
    async initItems ({ commit, state }) {
      commit('setLoading', true)

      const resItems = await axios.get('/item')
      const items = resItems.data

      const customizations = items.filter(item => item.type === 3)
      const flavors = items.filter(item => item.type === 2)
      const sizes = items.filter(item => item.type === 1)

      commit('setCustomizations', customizations)
      commit('setFlavors', flavors)
      commit('setSizes', sizes)

      commit('setLoading', false)
    },
    async initOrders ({ commit, state }) {
      commit('setLoading', true)

      const resOrders = await axios.get('/order')
      const orders = resOrders.data.map(order => {
        return new Order(order)
      })
      commit('setOrders', orders)

      commit('setLoading', false)
    }

  },
  modules: {}
})
