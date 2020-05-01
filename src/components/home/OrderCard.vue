<template>
  <v-card
    @click="() => ({})"
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
          Açaí de morango
        </div>
        <div>
          500ml
        </div>
        <div>
          <v-icon>mdi-alarm</v-icon> 50min
          <v-icon>mdi-currency-usd</v-icon> 40,00
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'OrderCardComponent'
}
</script>
