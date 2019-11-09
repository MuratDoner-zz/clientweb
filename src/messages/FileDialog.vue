<template>
    <v-dialog
            v-model="dialog"
            width="500"
    >
        <template v-slot:activator="{ on }">
            <v-btn
                    color="red lighten-2"
                    dark
                    v-on="on"
            >
                Click Me
            </v-btn>
        </template>

        <v-card>
            <v-card-title
                    class="headline grey lighten-2"
                    primary-title
            >
                File upload:
            </v-card-title>

            <v-card-text>
                <form class="form">
                    <div class="form-group">
                        <v-file-input @change="addFile"
                                      id="file" label="File input"
                                      name="file" show-size
                                      v-model="file"
                        ></v-file-input>

                    </div>
                </form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        @click="dialog = false"
                        color="primary"
                        text
                >
                    Cancel
                </v-btn>
                <v-btn
                        @click="sendFile"
                        color="primary"
                        text
                >
                    Send File
                </v-btn>


            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
    import mime from 'mime-types';

    export default {
        name: 'file-dialog',

        data() {
            return {
                dialog: false,
                files: [],
                authorized: ['image/jpeg', 'image/jpg', 'image/png']
            }
        },

        methods: {

            isValid(filename) {
                let index = this.authorized.indexOf(mime.lookup(filename))
                return index !== -1
            },

            sendFile() {
                this.dialog = false;
                if (this.file !== null) {
                    if (this.isValid(this.file.name)) {

                        let metadata = {contentType: mime.lookup(this.file.name)}
                        this.$parent.uploadFile(this.file, metadata)

                    }
                }
            },

            // reset form
            resetForm() {
                this.file = {}
            }
        }
    }
</script>


