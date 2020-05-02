<template>
  <v-container>
    <v-row
      class="text-center "
      justify="center"
    >
      <v-col
        cols="12"
        md="6"
        sm="8"
      >
        <Stepper/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NewOrderView',
  components: {
    Stepper: () => import('@/components/new_order/Stepper')
  }
}
</script>
