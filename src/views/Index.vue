<template>
  <v-app >
    <app-bar />
    <main-view/>
  </v-app>
</template>
<script>
  export default {
    name: 'DashboardIndex',
    components: {
      AppBar: () => import('../components/common/AppBar.vue'),
      MainView: () => import('../components/common/Main.vue')
    },
    data() {
      return {
      }
    },
  }
</script>