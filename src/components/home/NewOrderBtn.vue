<template>
  <v-col
    align-self="end"
    class="pa-0 ma-0 pb-4"
    :cols="isMobile ? 'auto' : 4"
    style="margin-bottom: auto; position: fixed"
  >
    <v-btn
      v-if="isMobile"
      @click="$router.push('/order')"
      bottom
      color="primary"
      dark
      fab
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn
      v-else
      @click="$router.push('/order')"
      block
      bottom
      color="primary"
      dark
      large
      rounded
    >
      Novo Pedido
    </v-btn>
  </v-col>
</template>
