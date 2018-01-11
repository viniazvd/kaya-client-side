<template>
  <div>
    <div class="card-wrapper flex justify-center">
      <q-card class="card-form">
        <h5 align="center">Login</h5>

        <q-card-separator />

        <q-card-main>
          <q-stepper flat ref="stepperLogin" v-model="stepLogin" color="primary">
            <q-step default title="E-mail" active-icon="mail">
              <q-field icon="mail" helper="exemplo: meuemail@gmail.com">
                <AppInput :prop.sync="user.email" nameLabel="E-mail" @keyUp="goToPassword"></AppInput>
              </q-field>

              <q-stepper-navigation class="flex justify-start">
                <router-link :to="'forgotEmail'">Esqueceu seu e-mail?</router-link>
              </q-stepper-navigation>

              <q-stepper-navigation class="flex justify-between">
                <router-link :to="'createAccount'">Criar conta</router-link>             
                <q-btn color="primary" icon="arrow_forward" @click="goToPassword">PRÓXIMA</q-btn>
              </q-stepper-navigation>

              <q-btn class="full-width" icon="no_encryption" color="grey" @click="loginInvited">Entrar como convidado</q-btn>
            </q-step>

            <q-step title="Senha" icon="lock" active-icon="lock">
              <q-field icon="lock">
                <AppInput :prop.sync="user.password" propType="password" nameLabel="Senha" @keyUp="attemptLogin"></AppInput>
              </q-field>

              <q-stepper-navigation class="flex justify-start">
                <router-link :to="'forgotPassword'">Esqueceu a senha?</router-link>             
              </q-stepper-navigation>

              <q-stepper-navigation class="flex justify-end">
                <q-btn color="primary" icon="arrow_back" flat @click="$refs.stepperLogin.previous()">Voltar</q-btn>
                <q-btn color="primary" icon="lock_open" @click="attemptLogin">Entrar</q-btn>
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </q-card-main>
      </q-card>
    </div>

    <NegativeAlert :showAlert.sync="showAlert" :alertMessage="alertMessage"></NegativeAlert>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
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
  name: 'login',

  components: {
    AppInput: () => import('../../../components/inputs/AppInput'),
    NegativeAlert: () => import('../../../components/alerts/AlertNegative'),
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
      user: {
        email: '',
        password: ''
      },
      stepLogin: 'first',
      showAlert: false,
      alertMessage: ''
    }
  },

  validations: {
    user: {
      email: { required, email },
      password: { required }
    }
  },

  mounted () {
    this.user.email = this.getEmail
  },

  methods: {
    ...mapActions(['doLogin', 'setEmail']),

    loginInvited () {
      this.$router.push('/invited')
    },

    goToPassword () {
      this.$v.$touch()
      const self = this

      if (this.$v.user.email.$error) {
        this.alertMessage = 'E-mail inválido'
        this.$activateAlert()
        setTimeout(() => self.$hideAlert(), 2000)
        return false
      }

      this.setEmail(this.user.email)

      this.$refs.stepperLogin.next()
    },

    attemptLogin () {
      const self = this
      if (this.$v.user.password.$error) {
        this.alertMessage = 'Senha inválida'
        this.$activateAlert()
        setTimeout(() => self.$hideAlert(), 2000)
        return false
      }

      this.$loader.show()
      setTimeout(() => {
        const user = this.user
        this.doLogin({ ...user })
          .then(() => this.$router.push('/home'))
          .catch(() => {
            this.alertMessage = 'E-mail ou senha não conferem.'
            this.$activateAlert()
            setTimeout(() => self.$hideAlert(), 2000)
            this.$router.push('/')
            return false
          })

        this.setEmail('')
        this.$loader.hide()
      }, 2000)
    }
  },

  computed: {
    ...mapGetters(['getEmail'])
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
</style>
