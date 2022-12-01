<template>
    <div class="fill-height d-flex align-center justify-center" v-if="students.length === 0">
        <h1>No students at the moment!</h1>
    </div>
    <v-row v-else class="pa-8">
        <v-col v-for="item, i in students" :key="i" cols="2">
            <v-card>
                <v-img contain :src="`https://randomuser.me/api/portraits/men/${i+13}.jpg`"></v-img>
                <v-card-actions>
                    <v-card-text>{{item.name}}</v-card-text>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState({
            students: (state) => state.students.students
        })
    },
    mounted(){
        this.getStudents()
    },
    methods: {
        getStudents(){
            this.$store.dispatch('students/getStudents')
        },
    }
}
</script>