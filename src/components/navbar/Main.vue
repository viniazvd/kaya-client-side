<template>
  <div>
    
    <q-layout ref="layout" view="lhh Lpr lFf">
      
      <!-- Layout header -->
      <q-toolbar slot="header">
        <q-btn flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>
        <div class="q-toolbar-title">Kaya</div>
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
import { QLayout, QSideLink, QItemMain, QToolbar, QToolbarTitle, QBtn, QIcon } from 'quasar-framework'

export default {
  name: 'navbar',
  components: { QLayout, QSideLink, QItemMain, QToolbar, QToolbarTitle, QBtn, QIcon },

  data () {
    return {
    }
  }
}
</script>