<template>
    <v-dialog v-model="dialog" persistent width="400">
        <v-card>
            <v-card-title class="d-flex">
                {{title}}
                <v-spacer />
                <v-icon @click="$emit('close')">mdi-close</v-icon>
            </v-card-title>
            <v-card-text>{{text}}</v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn text color="red" @click="$emit('close')">No</v-btn>
                <v-btn color="green" @click="$emit('confirm')">Yes</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: ['dialog', 'title', 'text'],
    data() {
        return {
        };
    },
}
</script>