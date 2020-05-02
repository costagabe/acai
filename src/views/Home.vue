<template>
  <v-container
    class="fill-height"
    ref="container"
  >
    <v-row
      align="center"
      align-content="center"
      class="fill-height"
      justify="center"
    >
      <v-col
        cols="11"
        md="6"
        lg="5"
        xl="4"
      >
        <v-btn
          @click.native="$router.push('/order')"
          block
          color="primary"
          large
          rounded
        >
          <b>Novo Pedido</b>
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    containerHeight: 0
  }),
  mounted () {
    this.containerHeight = this.$refs.container.clientHeight
  }
}
</script>

<style scoped>
.list::-webkit-scrollbar {
  display: none;
}
</style>
