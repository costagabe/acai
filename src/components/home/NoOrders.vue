<template>
  <v-row
    align="center"
    align-content="center"
    class="fill-height text-center primary--text"
    justify="center"
  >
    <v-col cols="auto">
      <h1>Nenhum pedido realizado</h1>
      <v-btn
        v-if="!isMobile"
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
