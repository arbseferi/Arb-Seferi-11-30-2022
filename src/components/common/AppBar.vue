<template>
  <v-app-bar
    id="app-bar"
    app
    flat
    color="white"
    fixed
    height="120px"
  >
  <div class="d-flex align-center justify-center" >
    <v-img width="200px" height="100px" contain :src="icon"></v-img>
  </div>
  <v-spacer />
  <div class="d-flex mx-6"><v-icon class="mx-2">mdi-account</v-icon><span>{{loggedUser.name + ' ' + loggedUser.surname}}</span></div>
  <v-btn color="red lighten-1" class="white--text" @click="logout">Log Out<v-icon class="ml-1" small>mdi-logout</v-icon></v-btn>
  </v-app-bar> 
</template>
<script>
import icon from '../../assets/management_logo.png'
export default {
  data() {
    return {
      icon: icon
    }
  },
    methods: {
      logout() {
       this.$router.push({path: '/login'})
      }
    },
    computed: {
      loggedUser() {
        return JSON.parse(localStorage.users)[0]
      }
    }
}
</script>