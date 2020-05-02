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
    </v-col>
  </v-row>
</template>
