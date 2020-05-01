<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h2>Açaí</h2>
    </v-app-bar>
    <v-content>
      <v-container
        :key="key"
        class="fill-height"
      >
        <router-view @update="key++" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Acai from './models/Acai'
import AcaiItem from './models/AcaiItem'

export default {
  name: 'App',
  data: () => ({
    key: 0
  }),
  created () {
    const acaiSize = new AcaiItem('500 ml', 10, 10, '')
    const acaiFlavor = new AcaiItem('Morango', 0, 10, '')
    const person1 = new AcaiItem('Paçoca', 3, 3, '')
    const acai = new Acai(acaiSize, acaiFlavor)
    acai.addCustomization(person1)
  }

}
</script>

<style>
html::-webkit-scrollbar {
  display: none;
}
</style>
