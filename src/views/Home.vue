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
      <NoOrders v-else />
      <NewOrderBtn v-if="orders.length || isMobile" />
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
    OrderList: () => import('@/components/home/OrderList'),
    NewOrderBtn: () => import('@/components/home/NewOrderBtn'),
    NoOrders: () => import('@/components/home/NoOrders')
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
