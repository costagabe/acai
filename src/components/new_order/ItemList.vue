<template>
  <v-list two-line>
    <v-list-item-group
      v-model="selected"
      active-class="white--text primary"
      :multiple="multiple"
    >
      <template v-for="(item, i) in items">
        <v-list-item
          :key="item.id"
          :value="item"
        >
          <template>
            <v-list-item-content>
              <v-list-item-title v-text="item.description"></v-list-item-title>
              <div v-if="item.cost" style="font-size: 12px">R$ {{item.cost}},00</div>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-divider :key="'0'+i" />
      </template>
    </v-list-item-group>
  </v-list>

</template>

<script>
export default {
  name: 'ItemListComponent',
  data: () => ({
    selected: null
  }),
  props: {
    items: {
      required: true,
      type: Array
    },
    multiple: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    selected (value) {
      this.$emit('input', value)
    }
  }
}
</script>
