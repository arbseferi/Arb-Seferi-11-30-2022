<template>
  <v-main class="pa-0 fill-height">
    <div class="d-flex justify-center">
      <a v-for="item,i in pages" :key="i" class="mx-2" :class="item.path === $route.path ? 'red--text' : ''" @click="route(item.path)">{{item.name}}</a>
    </div>
    <router-view />
  </v-main>
</template>
<script>
  export default {
    name: 'MainView',
    data() {
      return {
        pages: [
          {name: 'Home', path: '/home'},
          {name: 'Students', path: '/students'},
          {name: 'Archived', path: '/archived'},
          {name: 'Help', path: '/help'}
        ]
      }
    },
    methods: {
      route(path){
        this.$router.push({path: path})
      }
    }
  }
</script>