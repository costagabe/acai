<template>
  <v-snackbar
      v-model="notification.show"
      :color="notification.color"
      :timeout="4000"
      @click="notification.show = false"
      top
    >
      {{ notification.content }}

    </v-snackbar>
</template>

<script>
export default {
  name: 'SnackbarComponent',
  props: {
    notification: {
      required: true,
      type: Object
    }
  }
}
</script>
