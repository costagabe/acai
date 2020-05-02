import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Loading from '@/components/Loading'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.component('Loading', Loading)

export default (component, values = {}, others = {}) => {
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: []
  })
  const store = new Vuex.Store({
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
  const factory = (component) => {
    return shallowMount(component, {
      data () {
        return {
          isMobile: false,
          ...values
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
      ...others
    })
  }
  return factory(component, values)
}
