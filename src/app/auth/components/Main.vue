<template>
  <div>
    <div class="flex justify-center link-site" v-once>
      <a href="https://espacokaya.com.br/">
        <h5>Visite o nosso site</h5>
      </a>
    </div>

    <div class="card-wrapper flex justify-center">
      
      <q-card class="card-form">
        
        <h5 align="center">Login</h5>

        <q-card-separator />

        <q-card-main>
          <q-stepper flat ref="stepperLogin" v-model="stepLogin" color="primary">
            <q-step default name="email" title="E-mail" active-icon="mail">
              <q-field icon="mail" helper="exemplo: meuemail@gmail.com">
                <q-input
                  type="text"
                  float-label="E-mail"
                  v-model="user.email"
                  clearable
                  @keyup.enter="goToPassword"
                />
              </q-field>

              <q-stepper-navigation class="flex justify-start">
                <a href="javascript:void(0)">Esqueceu seu e-mail?</a>
              </q-stepper-navigation>

              <q-stepper-navigation class="flex justify-between">
                <a href="javascript:void(0)">Criar conta</a>
                <q-btn color="primary" icon="arrow_forward" @click="goToPassword">PRÓXIMA</q-btn>
              </q-stepper-navigation>

              <q-btn class="full-width" icon="no_encryption" color="grey" @click="loginInvited">Entrar como convidado</q-btn>
            </q-step>

            <q-step name="password" title="Senha" icon="lock" active-icon="lock">
              <q-field icon="lock">
                <q-input
                  type="password"
                  float-label="Senha"
                  v-model="user.password"
                  clearable
                  @keyup.enter="attemptLogin"
                />
              </q-field>

              <q-stepper-navigation class="flex justify-start">
                <a href="javascript:void(0)" @click="$refs.basicModal.open()">Esqueceu a senha?</a>
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

    <q-alert
      class="my-alert"
      color="negative"
      icon="warning"
      position="bottom"
      dismissible
      v-model="showAlert">
      {{ alertMessage }}
    </q-alert>

    <q-modal ref="basicModal" :content-css="modalStyle">
      <q-stepper flat ref="stepForgotPassword" v-model="stepForgotPassword" color="primary">
        <q-step default name="email" title="Reenvio" active-icon="mail">
          <div class="modal-title">
            Digite um e-mail que você possa verificar agora
          </div>
          
          <q-field icon="email" helper="exemplo: meuemail@gmail.com">
            <q-input 
              type="text" 
              v-model="emailToResend"
              float-label="E-mail"
              clearable
              @keyup.enter="checkEmail">
            </q-input>
          </q-field>

          <q-stepper-navigation class="padding-top justify-between">
            <q-btn color="primary" icon="arrow_back" flat @click="$refs.basicModal.close()">Voltar</q-btn>
            <q-btn color="primary" icon="arrow_forward" @click="checkEmail">PRÓXIMA</q-btn>
          </q-stepper-navigation>
        </q-step>

        <q-step name="password" title="Mudar senha" icon="lock" active-icon="lock">
          <q-field icon="vpn_key">
            <q-input
              type="text"
              float-label="Token recebido pelo e-mail"
              v-model="token"
              clearable
              @keyup.enter="changePassword"
            />
          </q-field>
          <q-field icon="lock">
            <q-input
              type="password"
              float-label="Escolha uma nova senha"
              v-model="newPassword"
              clearable
              @keyup.enter="changePassword"
            />
          </q-field>
          <div class="padding-top flex justify-between">
            <q-btn color="primary" icon="arrow_back" flat @click="$refs.stepForgotPassword.previous()">Voltar</q-btn>
            <q-btn color="primary" icon="mode_edit" @click="changePassword">Mudar senha</q-btn>
          </div>
        </q-step>
      </q-stepper>
    </q-modal>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
  QInnerLoading,
  QModal
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
    QInnerLoading,
    QModal
  },

  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      emailToResend: '',
      token: '',
      newPassword: '',
      stepLogin: 'first',
      stepForgotPassword: 'first',
      showAlert: false,
      alertMessage: '',
      modalStyle: {
        padding: '20px',
        marginRight: '15px',
        width: '400px',
        height: '400px'
      }
    }
  },

  validations: {
    user: {
      email: { required, email },
      password: { required }
    },
    emailToResend: { required, email },
    token: { required },
    newPassword: { required }
  },

  methods: {
    ...mapActions(['doLogin', 'doVerifyEmail', 'doChangePassword']),

    loginInvited () {
      this.$router.push('/invited')
    },

    goToPassword () {
      this.$v.$touch()
      const self = this

      if (this.$v.user.email.$error) {
        this.alertMessage = 'E-mail inválido'
        this.show()
        setTimeout(() => self.hide(), 3000)
        return false
      }

      this.$refs.stepperLogin.next()
    },

    attemptLogin () {
      const self = this

      if (this.$v.user.password.$error) {
        this.alertMessage = 'Senha inválida'
        this.show()
        setTimeout(() => self.hide(), 3000)
        return false
      }

      const user = this.user
      this.doLogin({ ...user })
        .then(() => {
          this.$router.push('/home')
        })
        .catch(() => {
          this.alertMessage = 'E-mail ou senha não conferem, tente novamente'
          this.show()
          setTimeout(() => self.hide(), 3000)
          return false
        })
    },

    checkEmail () {
      const self = this

      if (this.$v.emailToResend.$error) {
        this.alertMessage = 'E-mail inválido'
        this.show()
        setTimeout(() => self.hide(), 3000)
        return false
      }

      this.doVerifyEmail(this.emailToResend)
        .then(() => this.$refs.stepForgotPassword.next())
        .catch(() => {
          this.alertMessage = 'E-mail inexistente'
          this.show()
          setTimeout(() => self.hide(), 3000)
          return false
        })
    },

    changePassword () {
      const self = this

      if (this.$v.token.$error) {
        this.alertMessage = 'Token é obrigatório'
        this.show()
        setTimeout(() => self.hide(), 3000)
        return false
      }

      if (this.$v.newPassword.$error) {
        this.alertMessage = 'Senha é obrigatória'
        this.show()
        setTimeout(() => self.hide(), 3000)
        return false
      }

      const dataForChanging = {
        token: this.token,
        email: this.user.email,
        newPassword: this.newPassword
      }

      this.doChangePassword({ ...dataForChanging })
        .then(() => this.$refs.basicModal.close())
        .catch(() => {
          this.alertMessage = 'Um erro aconteceu. Tente novamente.'
          this.show()
          setTimeout(() => self.hide(), 3000)
          return false
        })
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

.modal-title {
  margin-top: 55px;
  margin-bottom: 30px;
  margin-left: 15px;
  font-size: 13px;
  text-align: center;
  font-weight: bold;
  /* color: #013ADF; */
}

.btn-modal {
  width: 100%;
  margin-top: 25px;
}

.padding-top {
  margin-top: 45px;
}
</style>
