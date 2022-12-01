<template>
    <v-card class="ma-8">
        <v-card-title >
        <div class="d-flex justify-center">
            <v-text-field v-model="search" class="mt-6" dense outlined label="Search" ></v-text-field>
        </div>
        <v-spacer />
        <v-btn color="primary" @click="addStudentDialog = true"><v-icon>mdi-plus</v-icon></v-btn>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="students"
            :search="search"
            :items-per-page="5">
            <template v-slot:[`item.actions`]="{ item }">
                <div class="d-flex">
                    <v-btn icon><v-icon class="mx-1" @click="editStudent(item)">mdi-pencil</v-icon></v-btn>
                    <v-btn icon><v-icon class="mx-1" color="red" @click="() => {deleteDialog = true; studentToDelete=item}">mdi-delete</v-icon></v-btn>
                </div>
            </template>
        </v-data-table>
        <confirm-dialog :title="'Delete Confirmation'" :text="'Are you sure you want to delete this student?'" :dialog="deleteDialog" @confirm="deleteStudent" @close="deleteDialog = false" />
        <add-student-dialog :dialog="addStudentDialog" @close="addStudentDialog = false" />
        <edit-student-dialog v-if="editStudentDialog" :dialog="editStudentDialog" :student="selectedStudent" @close="editStudentDialog = false" />
    </v-card>
</template>
<script>
import {mapState} from 'vuex'
import AddStudentDialog from './dialogs/AddStudentDialog.vue'
import ConfirmDialog from './dialogs/ConfirmDialog.vue'
import EditStudentDialog from './dialogs/EditStudentDialog.vue'
export default {
  components: { ConfirmDialog, AddStudentDialog, EditStudentDialog },
    data(){
        return {
            search: '',
            addStudentDialog: false,
            editStudentDialog: false,
            deleteDialog: false,
            selectedStudent: {},
            studentToDelete: {},
            headers: [
                { text: 'Index', value: 'index' },
                { text: 'Name', value: 'name' },
                { text: 'DoB', value: 'birthdate' },
                { text: 'Municipality', value: 'municipality' },
                { text: 'Action', value: 'actions' },
            ],
        }
    },
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
        editStudent(student){
            this.selectedStudent = student
            this.editStudentDialog = true
        },
        deleteStudent () {
            this.$store.dispatch('students/addStudentArchived', this.studentToDelete)
            this.deleteDialog = false
        },
    }
}
</script>