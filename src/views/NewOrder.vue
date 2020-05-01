<template>
  <v-container>
    <Snackbar :notification="notification" />
    <v-row
      class="text-center"
      justify="center"
    >
      <v-col
        cols="12"
        md="6"
        sm="8"
      >
        <v-stepper v-model="step">
          <v-stepper-header>
            <template v-for="(title, i) in stepper.titles">
              <v-stepper-step
                :complete="step > (i + 1)"
                :key="i"
                :step="i+1"
              >{{title}}</v-stepper-step>

              <v-divider :key="'0'+i" />
            </template>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content
              v-for="(page, i) in stepper.pages"
              :key="i"
              :step="i+1"
            >
              <v-card>
                <v-card-text class="text-start px-0">
                  <ItemList
                    :items="page.items"
                    :multiple="step === 3"
                    @input="form[page.form] === $event ? form[page.form] = null : form[page.form] = $event"
                  />
                </v-card-text>
                <v-card-actions class="pt-4">
                  <v-row no-gutters>
                    <v-col
                      v-if="step === 3"
                      class="mb-4"
                      cols="12"
                    >
                      <v-btn
                        block
                        color="primary"
                        large
                      >
                        Realizar Pedido
                      </v-btn>
                    </v-col>
                    <v-btn
                      :disabled="step === 1"
                      @click="prev"
                      color="primary"
                      fab
                    >
                      <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      :disabled="step === 3"
                      @click="next"
                      class=""
                      color="primary"
                      fab
                    >
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import db from '../assets/db'
export default {
  name: 'NewOrderView',
  components: {
    ItemList: () => import('@/components/NewOrder/ItemList'),
    Snackbar: () => import('@/components/NewOrder/Snackbar')
  },
  data: () => ({
    costumizations: [],
    form: {
      costumizations: [],
      flavor: null,
      size: null
    },
    flavors: [],
    notification: {
      show: false,
      color: 'yellow darken-3'
    },
    sizes: [],
    step: 1,
    stepper: {}
  }),
  created () {
    this.sizes = db.sizes
    this.costumizations = db.costumizations
    this.flavors = db.flavors
    this.initStepper()
  },
  methods: {
    initStepper () {
      this.stepper.titles = ['Tamanho', 'Sabor', 'Adicionais']
      this.stepper.pages = [{ items: this.sizes, form: 'size' }, { items: this.flavors, form: 'flavor' }, { items: this.costumizations, form: 'costumizations' }]
    },
    next () {
      if (this.validateStep()) {
        this.step++
      } else {
        this.showNotification('Selecione um item para continuar')
      }
    },
    prev () {
      this.step--
    },
    showNotification (msg) {
      this.notification.show = false
      this.$nextTick(() => {
        this.notification.show = true
        this.notification.content = msg
      })
    },
    validateStep () {
      const validations = [this.form.size, this.form.flavor]
      return validations[this.step - 1]
    }
  }
}
</script>
