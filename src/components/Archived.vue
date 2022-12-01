<template>
    <v-card class="ma-8">
        <v-card-title >
        <div class="d-flex justify-center">
            <v-text-field v-model="search" class="mt-6" dense outlined label="Search" ></v-text-field>
        </div>
        <v-spacer />
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="archivedStudents"
            :search="search"
            :items-per-page="5">
            <template v-slot:[`item.actions`]="{ item }">
                <div class="d-flex">
                    <v-btn icon><v-icon class="mx-1" color="green" @click="() => {restoreDialog = true; studentToRestore=item}">mdi-backup-restore</v-icon></v-btn>
                </div>
            </template>
        </v-data-table>
        <confirm-dialog :title="'Restore Confirmation'" :text="'Are you sure you want to restore this student?'" :dialog="restoreDialog" @confirm="restoreStudent" @close="restoreDialog = false" />
    </v-card>
</template>
<script>
import {mapState} from 'vuex'
import ConfirmDialog from './dialogs/ConfirmDialog.vue'
export default {
  components: { ConfirmDialog },
    data(){
        return {
            search: '',
            loading: true,
            restoreDialog: false,
            studentToRestore: {},
            headers: [
                { text: 'Index', value: 'index' },
                { text: 'Name', value: 'name' },
                { text: 'DoB', value: 'birthdate' },
                { text: 'Municipality', value: 'municipality' },
                { text: 'Archived Date', value: 'archiveDate' },
                { text: 'Action', value: 'actions' },
            ],
        }
    },
    computed: {
        ...mapState({
            archivedStudents: (state) => state.students.archivedStudents
        })
    },
    mounted(){
        this.getArchivedStudents()
    },
    methods: {
        getArchivedStudents(){
            this.$store.dispatch('students/getArchivedStudents')
        },
        restoreStudent () {
            this.$store.dispatch('students/addStudent', this.studentToRestore)
            this.restoreDialog = false
        },
    }
}
</script>