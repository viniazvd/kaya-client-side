<template>
  <div>
    <div class="card-wrapper flex justify-center">
      <q-card class="card-form">
        <h5 align="center">Esqueci o e-mail</h5>

        <q-card-separator />

        <q-card-main>
          <q-stepper flat ref="stepForgotEmail" v-model="stepForgotEmail" color="primary">
            <q-step default title="Nome" active-icon="import_contacts">
              <q-field icon="import_contacts">
                <AppInput :prop.sync="name" nameLabel="Nome" @keyUp="getEmail"></AppInput>
              </q-field>

              <q-stepper-navigation class="padding-top justify-between">
                <q-btn color="primary" icon="arrow_back" flat @click="$router.push('/login')">Voltar</q-btn>
                <q-btn color="primary" icon="mode_edit" @click="getEmail">Pesquisar</q-btn>
              </q-stepper-navigation>
            </q-step>

            <q-step title="Lista de e-mails" icon="email" active-icon="email">
              <div class="list-emails" v-for="user in this.users" :key="user.id">{{ user.email }}</div>

              <div class="padding-top flex justify-between">
                <q-btn color="primary" icon="arrow_back" flat @click="$refs.stepForgotEmail.previous()">Voltar</q-btn>
              </div>
            </q-step>
          </q-stepper>
        </q-card-main>
      </q-card>
    </div>

    <NegativeAlert :showAlert.sync="showAlert" :alertMessage="alertMessage"></NegativeAlert>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import alertMethods from '../../../support/mixins/alertsControl'
import {
  QField,
  QBtn,
  QCard,
  QCardSeparator,
  QCardMain,
  QStepper,
  QStep,
  QStepperNavigation
} from 'quasar'

export default {
  name: 'forgotEmail',

  components: {
    AppInput: () => import('../../../components/inputs/AppInput'),
    NegativeAlert: () => import('../../../components/alerts/Negative'),
    QField,
    QBtn,
    QCard,
    QCardSeparator,
    QCardMain,
    QStepper,
    QStep,
    QStepperNavigation
  },

  mixins: [alertMethods],

  data () {
    return {
      name: '',
      users: [],
      stepForgotEmail: 'first',
      showAlert: false,
      alertMessage: ''
    }
  },

  validations: {
    name: { required }
  },

  methods: {
    getEmail () {
      this.$refs.stepForgotEmail.next()
      this.$user.getEmails()
        .then(data => (this.users = data))
    }
  }
}
</script>

<style scoped>
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

.list-emails {
  text-align: center;
}
</style>
