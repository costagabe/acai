<template>
  <div>
    <v-stepper
      v-if="stepper"
      v-model="step"
    >
      <h1
        v-if="isMobile"
        class="primary--text"
      >{{stepper.titles[step-1]}}</h1>
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
      <Loading /> <!-- Enquanto envia o formulário -->
      <v-stepper-items v-show="!loading">
        <v-stepper-content
          v-for="(page, i) in stepper.pages"
          :key="i"
          :step="i+1"
        >
          <v-card>
            <v-card-text class="text-start px-0 pb-0">
              <ItemList
                :items="page.items"
                :multiple="step === 3"
                @input="form[page.form] = $event"
              />
            </v-card-text>
            <v-card-actions>
              <v-row no-gutters>
                <v-col
                  v-if="step === 3"
                  class="mb-4"
                  cols="12"
                >
                  <v-btn
                    @click.native="enviar"
                    :loading="loading"
                    block
                    color="primary"
                    large
                    ref="makeOrderBtn"
                  >
                    Realizar Pedido
                  </v-btn>
                </v-col>
                <v-btn
                  :disabled="step === 1"
                  @click.native="prev"
                  color="primary"
                  fab
                  ref="leftBtn"
                >
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn
                  :disabled="step === 3"
                  :loading="loading"
                  @click.native="next"
                  class=""
                  color="primary"
                  fab
                  ref="rightBtn"
                >
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <Loading v-else />
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'StepperComponent',
  components: {
    ItemList: () => import('@/components/new_order/ItemList')
  },
  data: () => ({
    form: {
      customizations: [],
      flavor: null,
      size: null
    },
    step: 1,
    stepper: null // Objeto que controla os dados e títulos do componente stepper
  }),
  computed: {
    ...mapState(['customizations', 'flavors', 'loading', 'sizes'])
  },
  async created () {
    await this.initItems()
    this.initStepper()
  },

  methods: {
    ...mapActions(['enviarPedido', 'initItems']),
    async enviar () {
      const order = await this.enviarPedido(this.form)
      const id = order.data.id
      this.showNotification('Pedido enviado com sucesso', 'green darken-3')
      this.$router.push(`/order/${id}`)
    },
    initStepper () {
      this.stepper = {
        titles: ['Tamanho', 'Sabor', 'Adicionais'],
        pages: [{ items: this.sizes, form: 'size' }, { items: this.flavors, form: 'flavor' }, { items: this.customizations, form: 'customizations' }]
      }
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

    validateStep () {
      const validations = [this.form.size, this.form.flavor]
      return validations[this.step - 1]
    }
  }
}
</script>
