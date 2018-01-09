<template>
  <div>
    <div class="flex justify-center link-site" v-once>
      <a href="https://espacokaya.com.br/">
        <h5>Visite o nosso site</h5>
      </a>
    </div>

    <div class="card-wrapper flex justify-center">
      <q-card class="card-form">
        <h5 align="center">Esqueci o e-mail</h5>

        <q-card-separator />

        <q-card-main>
          <q-stepper flat ref="stepForgotEmail" v-model="stepForgotEmail" color="primary">
            <q-step default name="phone" title="Telefone" active-icon="phone_forwarded">
              <q-field icon="call">
                <MyInput :prop.sync="phone" nameLabel="Telefone" @keyUp="next"></MyInput>
              </q-field>

              <q-stepper-navigation class="padding-top justify-between">
                <q-btn color="primary" icon="arrow_back" flat @click="$router.push('/login')">Voltar</q-btn>
                <q-btn color="primary" icon="search" @click="next">PRÓXIMA</q-btn>
              </q-stepper-navigation>
            </q-step>

            <q-step name="password" title="Nome/Sobrenome" icon="import_contacts" active-icon="import_contacts">
              <q-field icon="import_contacts">
                <MyInput :prop.sync="phone" nameLabel="Nome" @keyUp="getEmail"></MyInput>
              </q-field>

              <div class="padding-top flex justify-between">
                <q-btn color="primary" icon="arrow_back" flat @click="$refs.stepForgotEmail.previous()">Voltar</q-btn>
                <q-btn color="primary" icon="mode_edit" @click="getEmail">Pesquisar</q-btn>
              </div>
            </q-step>
          </q-stepper>
        </q-card-main>
      </q-card>
    </div>

    <q-alert
      class="my-alert"
      color="negative"
      icon="warning"
      position="bottom"
      dismissible
      v-model="showAlert">
      {{ alertMessage }}
    </q-alert>

    <q-inner-loading :visible="loading">
      <q-spinner-gears size="300px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import MyInput from '../../../components/inputs/myInput'
import {
  QField,
  QAlert,
  QBtn,
  QCard,
  QCardSeparator,
  QCardMain,
  QStepper,
  QStep,
  QStepperNavigation,
  QInnerLoading,
  QSpinnerGears
} from 'quasar'

export default {
  name: 'forgotEmail',

  components: {
    MyInput,
    QField,
    QAlert,
    QBtn,
    QCard,
    QCardSeparator,
    QCardMain,
    QStepper,
    QStep,
    QStepperNavigation,
    QInnerLoading,
    QSpinnerGears
  },

  data () {
    return {
      phone: '',
      name: '',
      lastName: '',
      stepForgotEmail: 'first',
      showAlert: false,
      alertMessage: '',
      loading: false
    }
  },

  validations: {
    phone: { required },
    name: { required },
    lastName: { required }
  },

  methods: {
    next () {
      this.$refs.stepForgotEmail.next()
    },

    getEmail () {
      console.log('ae')
    }
  }
}
</script>

<style scoped>
.link-site {
  padding-top: 30px;
  text-decoration: underline;
}

.my-alert {
  margin-left: 448px;
  margin-right: 446px;
  margin-bottom: 115px;
  text-align: center;
  position: relative;
}

.card-wrapper {
  width: 100%;
  height: 100%;
  padding-top: 0px;
  overflow: auto;
}

.card-form {
  width: 400px;
  background: #ffffff;
}

.padding-top {
  margin-top: 45px;
}
</style>
