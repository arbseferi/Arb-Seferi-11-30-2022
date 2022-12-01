<template>
<v-app id="app" style="overflow: hidden">
    <v-row class="d-flex align-center justify-center">
    <v-col class="d-flex align-center justify-center" cols="5">
        <v-form v-model="loginDisabled">
        <v-card
            color="transparent"
            flat
            class="py-8 px-16 mr-16"
        >
            <v-alert v-model="alertFail" dense dismissible text type="error">
            {{ alertMsg }}
            </v-alert>
            <v-card-title class="d-flex justify-center"> Welcome </v-card-title>
            <v-text-field
            v-model="username"
            label="Email"
            dense
            :rules="rules"
            outlined
            ></v-text-field>
            <v-text-field
            v-model="password"
            type="password"
            label="Password"
            hint="123456"
            dense
            :rules="rules"
            outlined
            ></v-text-field>
            <v-card-actions>
            <v-spacer />
            <v-btn @click="login" class="white--text" :disabled="!loginDisabled" color="blue">Login</v-btn>
            </v-card-actions>
        </v-card>
        </v-form>
    </v-col>
    </v-row>
</v-app>
</template>
<script>
export default {
    data() {
        return {
        username: "arb_seferi@hotmail.com",
        password: "",
        loginDisabled: false,
        alertFail: false,
        alertMsg: ''
        };
    },
    computed: {
        rules() {
            return [
                (v) => !!v || 'Field is required',
            ];
        }
    },
    async mounted(){
        localStorage.removeItem("sessionToken")
        this.seeders()
    },
    methods: {
        async login() {
            const body = {
                email: this.username,
                password: this.password
            }
            this.$store.dispatch('authentication/login', body)
            this.$router.push({name: 'Home'})
        },
        seeders() {
            if(localStorage.users === undefined) {
                localStorage.users = JSON.stringify([
                    {name: 'Arb', surname: 'Seferi', email: 'arb_seferi@hotmail.com', password: '123456'}
                ])
            }
            if(localStorage.students === undefined) {
                localStorage.students = JSON.stringify([])
            }
            if(localStorage.archivedStudents === undefined) {
                localStorage.archivedStudents = JSON.stringify([])
            }
        },
    }
}
</script>