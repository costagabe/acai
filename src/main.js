import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.component('Loading', () => import('@/components/Loading'))

Vue.mixin({
  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  methods: {
    showNotification (msg, color = 'yellow darken-3') {
      console.log(this.$store.state)
      this.$store.state.notification.show = false
      this.$nextTick(() => {
        this.$store.state.notification.show = true
        this.$store.state.notification.color = color
        this.$store.state.notification.content = msg
      })
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
