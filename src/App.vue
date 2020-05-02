<template>
  <v-app>
    <Snackbar />
    <v-app-bar
      app
      color="primary"
      dark
    >
      <router-link to="/">
        <h2 class="white--text">Açaí</h2>
      </router-link>
    </v-app-bar>
    <v-content :key="key">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    Snackbar: () => import('@/components/Snackbar')
  },
  data: () => ({
    key: 0
  }),
  watch: {
    // Quando o usuário mudar o tamanho da página, recarregar tudo para que não haja quebras no layout
    '$vuetify.breakpoint.width' () {
      this.key++
    }
  }

}
</script>

<style>
html::-webkit-scrollbar {
  display: none;
}
</style>
