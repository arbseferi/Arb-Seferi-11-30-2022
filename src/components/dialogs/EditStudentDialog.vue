<template>
    <v-dialog v-model="dialog" persistent width="600">
        <v-form v-model="disabled">
            <v-card>
                    <v-card-title class="d-flex">
                        Edit Student
                        <v-spacer />
                        <v-icon @click="$emit('close')">mdi-close</v-icon>
                    </v-card-title>
                    <div class="px-16 pt-6">
                        <div class="d-flex">
                    <v-text-field v-model="student.name" :rules="rules" dense outlined label="Full Name *" ></v-text-field>
                    </div>
                    <v-text-field v-model="student.birthdate" :rules="rules" :max="maxDate" type="date" dense outlined label="Birthdate *" ></v-text-field>
                    <v-select v-model="student.municipality" :rules="rules"  dense outlined :items="municipalities" label="Municipality *">
                    </v-select>
                    </div>
                <v-card-actions>
                    <v-spacer />
                    <v-btn text color="red" @click="$emit('close')">Cancel</v-btn>
                    <v-btn :disabled="!disabled" color="green" class="white--text" @click="editStudent">Edit</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>
<script>
export default {
    props: ['dialog', 'student'],
    data() {
        return {
            disabled: false,
            municipalities: ['Prishtine', 'Tetove', 'Shkup', 'Tirane', 'Prizren', 'Gostivar', 'Struge'],
            maxDate: new Date(2002, 12, 0).toISOString().slice(0, 10),
        };
    },
    computed: {
        rules() {
        return [
                (v) => !!v || 'Field is required',
            ];
        }
    },
    methods: {
        editStudent() {
            const body = {
                index: this.student.index,
                name: this.student.name,
                municipality: this.student.municipality,
                birthdate: this.student.birthdate
            }
            this.$store.dispatch('students/editStudents', body)
            this.$emit('close')
        },
    }
}
</script>