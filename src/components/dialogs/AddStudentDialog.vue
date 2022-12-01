<template>
    <v-dialog v-model="dialog" persistent width="600">
        <v-form v-model="disabled">
            <v-card>
                    <v-card-title class="d-flex">
                        Add New Student
                        <v-spacer />
                        <v-icon @click="$emit('close')">mdi-close</v-icon>
                    </v-card-title>
                    <div class="px-16 pt-6">
                        <div class="d-flex">
                    <v-text-field v-model="name" :rules="rules" dense outlined label="Full Name *" ></v-text-field>
                    </div>
                    <v-text-field v-model="birthdate" :rules="rules" :max="maxDate" type="date" dense outlined label="Birthdate *" ></v-text-field>
                    <v-select v-model="municipality" :rules="rules"  dense outlined :items="municipalities" label="Municipality *">
                    </v-select>
                    </div>
                <v-card-actions>
                    <v-spacer />
                    <v-btn text color="red" @click="$emit('close')">Cancel</v-btn>
                    <v-btn :disabled="!disabled" color="green" class="white--text" @click="addStudent">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>
<script>
export default {
    props: ['dialog'],
    data() {
        return {
            disabled: false,
            name: '',
            birthdate: '',
            municipalities: ['Prishtine', 'Tetove', 'Shkup', 'Tirane', 'Prizren', 'Gostivar', 'Struge'],
            municipality: '',
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
        addStudent() {
            const body = {
                index: this.uuidv4(),
                name: this.name,
                municipality: this.municipality,
                birthdate: this.birthdate
            }
            this.$store.dispatch('students/addStudent', body)
            this.$emit('close')
        },
        uuidv4() {
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }
    }
}
</script>