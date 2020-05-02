<template>
  <v-row justify="space-between">
    <v-col cols="auto">
      {{title}} {{item.description}}
    </v-col>
    <v-col cols="auto">
      R$ {{item.cost}},00
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ItemDescriptionComponent',
  props: {
    item: {
      required: true,
      type: Object
    },
    title: {
      required: true,
      type: String
    }
  }
}
</script>
