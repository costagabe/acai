<template>
  <v-progress-circular
    v-if="loading"
    class="my-12"
    color="primary"
    indeterminate
    size="200"
  />

</template>

<script>
export default {
  name: 'LoadingComponent',
  computed: {
    loading () {
      return this.$store.state.loading
    }
  }
}
</script>
