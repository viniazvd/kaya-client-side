<template>
  <div>
    <div class="flex justify-center link-site">
      <a href="https://espacokaya.com.br/">
        <h5>Visite o nosso site</h5>
      </a>
    </div>

    <div class="card-wrapper flex justify-center">
      
      <q-card class="card-form">
        
        <h5 align="center">Login</h5>

        <q-card-separator />

        <q-card-main class="form">

          <q-stepper flat ref="stepper" v-model="step" color="primary">
            <q-step default name="email" title="E-mail" active-icon="mail">
              <q-field icon="mail" helper="exemplo: meuemail@gmail.com">
                <q-input
                  type="text"
                  float-label="E-mail"
                  v-model="email"
                  clearable
                />
              </q-field>

              <q-stepper-navigation class="flex justify-start">
                <a href="javascript:void(0)">Esqueceu seu e-mail?</a>
              </q-stepper-navigation>

              <q-stepper-navigation class="flex justify-between">
                <a href="javascript:void(0)">Criar conta</a>
                <q-btn color="primary" @click="next">PRÓXIMA</q-btn>
              </q-stepper-navigation>

              <q-btn class="full-width" color="grey" @click="loginInvited">Entrar como convidado</q-btn>
            </q-step>

            <q-step name="password" title="Password" icon="lock" active-icon="lock">
              <q-field icon="lock">
                <q-input
                  type="password"
                  float-label="Password"
                  v-model="password"
                  clearable
                  @blur="$v.password.$touch"
                  @keyup.enter="submit"
                />
              </q-field>

              <q-stepper-navigation class="flex justify-end">
                <q-btn color="primary" flat @click="$refs.stepper.previous()">Voltar</q-btn>
                <q-btn color="primary" @click="submit">Entrar</q-btn>
              </q-stepper-navigation>
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
      v-model="showAlert"
    >
      {{ alertMessage }}
    </q-alert>

  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import {
  QAlert,
  QBtn,
  QInput,
  QField,
  QCard,
  QCardTitle,
  QCardSeparator,
  QCardMain,
  QStepper,
  QStep,
  QStepperNavigation,
  QOptionGroup,
  QInnerLoading
} from 'quasar'

export default {
  name: 'auth',

  components: {
    QAlert,
    QBtn,
    QInput,
    QField,
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QStepper,
    QStep,
    QStepperNavigation,
    QOptionGroup,
    QInnerLoading
  },

  data () {
    return {
      email: '',
      password: '',
      step: 'first',
      options: ['alt'],
      showAlert: false,
      alertMessage: ''
    }
  },
  validations: {
    email: { required, email },
    password: { required }
  },
  methods: {
    loginInvited () {
      this.$router.push('/invited')
    },

    next () {
      this.$v.$touch()
      const self = this

      if (this.$v.email.$error) {
        this.alertMessage = 'E-mail inválido'
        this.show()
        setTimeout(() => self.hide(), 3000)
        return false
      }

      this.$refs.stepper.next()
    },

    submit () {
      const self = this

      if (this.$v.password.$error) {
        this.alertMessage = 'Senha inválida'
        this.show()
        setTimeout(() => self.hide(), 3000)
        return false
      }

      this.$router.push('/home')
    },

    show () {
      this.showAlert = true
    },

    hide () {
      this.showAlert = false
    }
  }
}
</script>

<style scoped>
.link-site {
  padding-top: 50px;
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
  padding-top: 50px;
  overflow: auto;
}

.card-form {
  width: 400px;
  background: #ffffff;
}
</style>
