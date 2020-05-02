<template>
  <v-row
    align="center"
    align-content="center"
    class="fill-height text-center primary--text"
    justify="center"
  >
    <Loading />
    <v-col
      v-if="!$store.state.loading"
      cols="auto"
    >
      <h1>Nenhum pedido realizado</h1>
      <v-btn
        v-if="!isMobile"
        @click="$router.push('/order')"
        block
        color="primary"
        large
        rounded
      >
        <b>Novo Pedido</b>
      </v-btn>
    </v-col>

  </v-row>
</template>
