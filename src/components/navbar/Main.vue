<template>
  <div>
    
    <q-layout ref="layout" view="lhh Lpr lFf">
      
      <!-- Layout header -->
      <q-toolbar slot="header">
        <q-btn flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>
        <div class="q-toolbar-title">Kaya</div>
        <q-btn flat>
          <q-icon name="more_vert" />
          <q-popover ref="popover" :anchor="anchor" :self="self">
            <q-list link style="min-width: 150px">
              <q-item @click="null, $refs.popover.close()">
                <q-item-main label="Minha conta" />
              </q-item>

              <q-item @click="logout(), $refs.popover.close()">
                <q-item-main label="Sair" />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </q-toolbar>

      <!-- Defining left side of QLayout. Notice slot="left" -->
      <div slot="left">
        <img src="../../statics/logo/kaya.png" alt="Espaço Kaya">

        <q-side-link item to="/home" exact>
          <q-item-main label="Home" />
        </q-side-link>

        <q-side-link item to="/usuarios">
          <q-item-main label="Usuários" />
        </q-side-link>

        <q-side-link item to="/atividades">
          <q-item-main label="Atividades" />
        </q-side-link>

        <q-side-link item to="/clientes">
          <q-item-main label="Clientes" />
        </q-side-link>

        <q-side-link item to="/tarefas">
          <q-item-main label="Tarefas" />
        </q-side-link>

        <!--
        <q-side-link item to="/agenda">
          <q-item-main label="Agenda" />
        </q-side-link>

        <q-side-link item to="/relatorios">
          <q-item-main label="Relatórios" />
        </q-side-link>

        <q-side-link item to="/graficos">
          <q-item-main label="Gráficos" />
        </q-side-link>

        <q-side-link item to="/localizacao">
          <q-item-main label="Localização" />
        </q-side-link>

        <q-side-link item to="/contato">
          <q-item-main label="Contato" />
        </q-side-link>
      -->
      </div>
      <router-view></router-view>
  </q-layout>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  QLayout,
  QSideLink,
  QItemMain,
  QToolbar,
  Toast,
  QPopover,
  QList,
  QItem,
  QBtn,
  QIcon
} from 'quasar'

export default {
  name: 'navbar',

  components: {
    QLayout,
    QSideLink,
    QItemMain,
    QToolbar,
    Toast,
    QPopover,
    QList,
    QItem,
    QBtn,
    QIcon
  },

  data () {
    return {
      defaultAnchor: {
        vertical: 'bottom',
        horizontal: 'left'
      },
      defaultSelf: {
        vertical: 'top',
        horizontal: 'left'
      }
    }
  },
  computed: {
    anchor () {
      return `${this.defaultAnchor.vertical} ${this.defaultAnchor.horizontal}`
    },
    self () {
      return `${this.defaultSelf.vertical} ${this.defaultSelf.horizontal}`
    }
  },

  methods: {
    ...mapActions(['doLogout']),

    showToast () {
      Toast.create((this.$q.platform.is.desktop ? 'Clicked' : 'Tapped'))
    },

    logout () {
      this.doLogout()
      this.$router.push('/login')
    }
  }
}
</script>