<template>
  <div>
    <div class="card-wrapper flex justify-center">
      <q-card class="card-form">
        <h5 align="center">Esqueci a senha</h5>

        <q-card-separator />

        <q-card-main>
          <q-stepper flat ref="stepForgotPassword" v-model="stepForgotPassword" color="primary">
            <q-step default name="email" title="Reenvio" active-icon="mail">
              <div class="title">Digite um e-mail que você possa verificar agora</div>
              <q-field icon="mail" helper="exemplo: meuemail@gmail.com">
                <AppInput :prop.sync="emailToResend" nameLabel="E-mail" @keyUp="checkEmail"></AppInput>
              </q-field>        

              <q-stepper-navigation class="padding-top justify-between">
                <q-btn color="primary" icon="arrow_back" flat @click="$router.push('/login')">Voltar</q-btn>
                <q-btn color="primary" icon="arrow_forward" @click="checkEmail">PRÓXIMA</q-btn>
              </q-stepper-navigation>
            </q-step>

            <q-step name="password" title="Mudar senha" icon="lock" active-icon="lock">
              <q-field icon="vpn_key">
                <AppInput :prop.sync="token" nameLabel="Token recebido pelo e-mail" @keyUp="changePassword"></AppInput>
              </q-field>
              <q-field icon="lock">
                <AppInput :prop.sync="newPassword" propType="password" nameLabel="Escolha uma nova senha" @keyUp="changePassword"></AppInput>
              </q-field>

              <div class="padding-top flex justify-between">
                <q-btn color="primary" icon="arrow_back" flat @click="$refs.stepForgotPassword.previous()">Voltar</q-btn>
                <q-btn color="primary" icon="mode_edit" @click="changePassword">Mudar senha</q-btn>
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
  name: 'forgotPassword',

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
      emailToResend: '',
      token: '',
      newPassword: '',
      stepForgotPassword: 'first',
      showAlert: false,
      alertMessage: ''
    }
  },

  validations: {
    emailToResend: { required, email },
    token: { required },
    newPassword: { required }
  },

  mounted () {
    // Código que irá rodar apenas após toda
    // a árvore do componente ter sido renderizada
    this.$nextTick(function () {
      this.emailToResend = this.getEmail
    })
  },

  methods: {
    ...mapActions(['doVerifyEmail', 'doChangePassword']),

    checkEmail () {
      const self = this

      if (this.$v.emailToResend.$error) {
        this.alertMessage = 'E-mail inválido'
        this.$activateAlert()
        setTimeout(() => self.$hideAlert(), 2000)
        return false
      }

      this.doVerifyEmail(this.emailToResend)
        .then(() => this.$refs.stepForgotPassword.next())
        .catch(() => {
          this.alertMessage = 'E-mail inexistente'
          this.$activateAlert()
          setTimeout(() => self.$hideAlert(), 2000)
          return false
        })
    },

    changePassword () {
      this.$v.$touch()
      const self = this

      if (this.$v.token.$error) {
        this.alertMessage = 'Token é obrigatório'
        this.$activateAlert()
        setTimeout(() => self.$hideAlert(), 2000)
        return false
      }

      if (this.$v.newPassword.$error) {
        this.alertMessage = 'Senha é obrigatória'
        this.$activateAlert()
        setTimeout(() => self.$hideAlert(), 2000)
        return false
      }

      const dataForChanging = {
        token: this.token,
        email: this.emailToResend,
        newPassword: this.newPassword
      }
      this.$loader.show()
      setTimeout(() => {
        this.doChangePassword({ ...dataForChanging })
          .then(() => this.$router.push('/login'))
          .catch(() => {
            this.alertMessage = 'Um erro aconteceu.'
            this.$activateAlert()
            setTimeout(() => self.$hideAlert(), 2000)
            return false
          })

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

.title {
  margin-top: 20px;
  margin-bottom: 30px;
  margin-left: 15px;
  font-size: 13px;
  text-align: center;
  font-weight: bold;
}

.padding-top {
  margin-top: 45px;
}
</style>
