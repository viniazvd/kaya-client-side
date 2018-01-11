<template>
  <div>
    <div class="card-wrapper flex justify-center">
      <q-card class="card-form">
        <h5 align="center">Criar conta</h5>

        <q-card-separator />

        <q-card-main>
          <q-field icon="import_contacts">
            <MyInput :prop.sync="newUser.name" nameLabel="Nome" @keyUp="createAccount"></MyInput>
          </q-field>
          <q-field icon="mail" helper="exemplo: meuemail@gmail.com">
            <MyInput :prop.sync="newUser.email" nameLabel="E-mail" @keyUp="createAccount"></MyInput>
          </q-field>
          <q-field icon="lock">
            <MyInput :prop.sync="newUser.password" propType="password" nameLabel="Escolha uma nova senha" @keyUp="createAccount"></MyInput>
          </q-field>

          <div class="padding-top flex justify-between">
            <q-btn color="primary" icon="arrow_back" flat @click="$router.push('/login')">Voltar</q-btn>
            <q-btn color="primary" icon="add" @click="createAccount">Criar</q-btn>
          </div>
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import {
  QField,
  QAlert,
  QBtn,
  QCard,
  QCardSeparator,
  QCardMain,
  QStepper,
  QStep,
  QStepperNavigation
} from 'quasar'

export default {
  name: 'createAccount',

  components: {
    MyInput: () => import('../../../components/inputs/myInput'),
    QField,
    QAlert,
    QBtn,
    QCard,
    QCardSeparator,
    QCardMain,
    QStepper,
    QStep,
    QStepperNavigation
  },

  data () {
    return {
      newUser: {
        name: '',
        email: '',
        password: ''
      },
      stepCreateAccount: 'first',
      showAlert: false,
      alertMessage: ''
    }
  },

  validations: {
    newUser: {
      email: { required, email },
      password: { required }
    }
  },

  methods: {
    ...mapActions(['doCreateAccount']),

    createAccount () {
      this.$v.$touch()
      const self = this

      if (this.$v.newUser.email.$error) {
        this.alertMessage = 'E-mail inválido'
        this.activateAlert()
        setTimeout(() => self.hideAlert(), 2000)
        return false
      }

      if (this.$v.newUser.password.$error) {
        this.alertMessage = 'Senha obrigatória'
        this.activateAlert()
        setTimeout(() => self.hideAlert(), 2000)
        return false
      }

      this.$loader.show()
      setTimeout(() => {
        const newUser = this.newUser
        this.doCreateAccount({ ...newUser })
          .then(() => this.$router.push('/login'))
          .catch(() => {
            this.alertMessage = 'Um erro aconteceu.'
            this.activateAlert()
            setTimeout(() => self.hideAlert(), 2000)
            return false
          })

        this.$loader.hide()
      }, 2000)
    },

    activateAlert () {
      this.showAlert = true
    },

    hideAlert () {
      this.showAlert = false
    }
  }
}
</script>

<style scoped>
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
