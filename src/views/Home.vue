<template>
  <v-container
    class="fill-height"
    ref="container"
  >
    <v-row
      align="start"
      align-content="start"
      class="fill-height"
      justify="center"
    >
      <OrderList
        v-if="orders.length"
        :containerHeight="containerHeight"
        :orders="orders"
      />
      <v-row
        v-else
        align="center"
        class="fill-height text-center primary--text"
        justify="center"
      >
        <h1>Nenhum pedido realizado</h1>
      </v-row>

      <v-col
        align-self="end"
        class="pa-0 ma-0 pb-4"
        cols="auto"
        style="margin-bottom: auto; position: fixed"
      >
        <v-btn
          bottom
          color="primary"
          dark
          fab
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
    OrderList: () => import('@/components/home/OrderList')
  },
  data: () => ({
    containerHeight: 0,
    orders: []
  }),
  mounted () {
    this.containerHeight = this.$refs.container.clientHeight
  },

  watch: {
    '$vuetify.breakpoint.width' () {
      this.$emit('update')
    }
  }

}
</script>

<style scoped>
.list::-webkit-scrollbar {
  display: none;
}
</style>
