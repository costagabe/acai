<template>
  <v-col
    :style="{'max-height': `${containerHeight}px`}"
    class="overflow-y-auto list"
  >
    <v-row>
      <v-col
        v-for="(order, i) in orders"
        :key="i"
        cols="12"
        lg="3"
        md="4"
      >
        <OrderCard />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'OrderListComponent',
  components: {
    OrderCard: () => import('@/components/home/OrderCard')
  },
  props: {
    containerHeight: {
      type: Number,
      required: true
    },
    orders: {
      type: Array,
      required: true
    }
  }
}
</script>
