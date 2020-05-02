<template>
  <v-container class="fill-height">
    <v-row
      justify="center"
      class="fill-height"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="5"
        xl="4"
      >

        <v-card
          class="fill-height"
          elevation="5"
        >
          <v-app-bar
            color="primary"
            dark
          >
            <h2>Detalhes do pedido #{{$route.params.id}}</h2>
          </v-app-bar>
          <v-card-text v-if="order">
            <ItemDescription
              :item="order.size"
              title="Tamanho: "
            />
            <v-divider />
            <ItemDescription
              :item="order.flavor"
              title="Sabor: "
            />
            <v-divider />
            <template v-for="(customization, i) in order.customizations">

              <ItemDescription
                :key="i"
                :item="customization"
                :title="`Adicional: `"
              />
              <v-divider :key="'0'+i" />
            </template>
            <ItemDescription
              :item="order"
              title="Total: "
            />
            <v-divider />
          </v-card-text>
          <v-row
            v-else
            justify="center"
          >
            <v-col cols="auto">
              <Loading />
            </v-col>
          </v-row>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/plugins/axios'
import Order from '@/models/Order'
export default {
  name: 'OrderView',
  components: {
    ItemDescription: () => import('@/components/order/ItemDescription')
  },
  async created () {
    const id = this.$route.params.id
    this.$store.commit('setLoading', true)
    try {
      const res = await axios.get(`/order/${id}`)
      this.order = new Order(res.data)
    } catch (e) {
      if (e.response && e.response.status === 404) {
        this.showNotification('Pedido não encontrado', 'red darken-3')
      } else {
        this.showNotification('Erro desconhecido', 'red darken-3')
      }
      this.$store.commit('setLoading', false)
    }
  },
  data: () => ({
    order: null
  })
}
</script>
