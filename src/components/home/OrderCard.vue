<template>
  <v-card
    @click="$router.push(`/order/${order.id}`)"
    class="pa-2"
    elevation="5"
  >
    <v-row no-gutters>
      <v-col
        class="mr-2"
        cols="auto"
      >
        <v-img
          class="elevation-2"
          src="@/assets/acai.png"
          width="75px"
        >

        </v-img>
      </v-col>
      <v-col
        class=" text-center"
        style="font-size: 16px"
      >
        <div>
          Açaí de {{order.flavor.description.toLowerCase()}}
        </div>
        <div>
          {{order.size.description}}
        </div>
        <div>
          <v-icon class="mb-1">mdi-alarm</v-icon> {{order.time}}min
          <v-icon class="mb-1">mdi-currency-usd</v-icon> {{order.cost}},00
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'OrderCardComponent',
  props: {
    order: {
      type: Object,
      required: true
    }
  }
}
</script>
