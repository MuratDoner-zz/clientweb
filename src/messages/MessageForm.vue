<template>
    <div>
        <div class="messageform">

          <!-- file upload progress bar -->
            <v-progress-linear
                    :active="active"
                    :height="9"
                    :value="percent"
            >
                <strong>{{ Math.ceil(percent) }}%</strong>
            </v-progress-linear>
            <form @submit.prevent="sendMessage">
                <div class="input-group mb-3">
                    <input v-model.trim="message" name="message" id="message" placeholder="Write something" class="form-control mt-3" autofocus>

                    <div class="input-group-append">
                        <button @click="sendMessage" class="btn btn-primary mt-3" type="button">&nbsp; Send &nbsp;</button>
                    </div>

                    <div class="input-group-append">
                        <file-dialog></file-dialog>
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import FileDialog from './FileDialog'
    import firebase from 'firebase/app';

    import uuid from 'uuidv4'
    import 'firebase/storage'

    export default {
        name: 'message-form',
        components: {FileDialog},

        data() {
          return {
              percent: 0,
              active: false,
            message: '',
            errors: [],
            storageRef: firebase.storage().ref(),
            uploadTask: null,
            uploadState: null
          }
        },

        computed: {
          ...mapGetters(['currentChannel', 'currentUser', 'isPrivate']),

          // upload state
          uploadLabel() {
            switch(this.uploadState) {
                case 'uploading':
                    return 'Uploading in progress'

                case 'error':
                    return 'Error occured'

                case 'done':
                    return 'Upload completed'

              default: return ''
            }
          }
        },

        methods: {
          sendMessage() {
            // construct new message object
            // let newMessage = {
            //   content: this.message,
            //   timestamp: firebase.database.ServerValue.TIMESTAMP,
            //   user: {
            //     name: this.currentUser.displayName,
            //     avatar: this.currentUser.photoURL,
            //     id: this.currentUser.uid
            //   }
            // }

            // use some validation
            if(this.currentChannel !== null) {
              if(this.message.length > 0) {
                this.$parent.getMessagesRef().child(this.currentChannel.id).push().set(this.createMessage())
                .then(() => {
                  this.$nextTick(() => {
                      this.mounted();
                  })
                })
                .catch((error) => {
                  this.errors.push(error.message)
                })
                // reset message
                this.message = ''
              }
            }
          },

          createMessage(fileUrl = null) {
            // create message object to push to firebase
            let message = {
              timestamp: firebase.database.ServerValue.TIMESTAMP,
              user: {
                name: this.currentUser.displayName,
                avatar: this.currentUser.photoURL,
                id: this.currentUser.uid
              }
            }

            if(fileUrl == null) {
              // either send message with content
              message['content'] = this.message
            } else {
              // or send the message with image
              message['image'] = fileUrl
            }
            return message
          },

            uploadFile(file, metadata) {
            if(file === null) return false

              let pathToUpload = this.currentChannel.id
              let ref = this.$parent.getMessagesRef()
              let filePath = this.getPath() + '/' + uuid() + '.jpg'

              this.uploadTask = this.storageRef.child(filePath).put(file, metadata)
              this.uploadState = "uploading"

              // on upload state change
              this.uploadTask.on('state_changed', snapshot => {
                // upload in progress
                let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  this.active = true;
                  this.percent = percent;
              }, error => {
                // error
                this.errors.push(error.message)
                this.uploadState = 'error'
                this.uploadTask = null
                // reset form

              }, () => {
                // upload finished
                this.uploadState = 'done'
                // reset form
                  this.active = false;
                // recover the url of file
                  this.uploadTask.snapshot.ref.getDownloadURL().then(fileUrl => {
                  this.sendFileMessage(fileUrl, ref, pathToUpload)
                })
              })
          },

          sendFileMessage(fileUrl, ref, pathToUpload) {
            ref.child(pathToUpload).push().set(this.createMessage(fileUrl)).then(() => {
              this.$nextTick(() => {
                  this.mounted();
              })
            }).catch(error => {
              this.errors.push(error.message)
            })
          },

          // folder directory to store files in firebase storage
          getPath() {
            if(this.isPrivate) {
              return 'chat/private/'+this.currentChannel.id
            } else {
              return 'chat/public'
            }
          }
        },

        mounted() {

            //TODO:$("html, body").scrollTop($(document).height());
        },

        beforeDestroy() {
          if(this.uploadTask !== null) {
            this.uploadTask.cancel()
            this.uploadTask = null
          }
        }
    }
</script>

<style scoped>
    .messageform {
        position: fixed;
        left:0;
        bottom:0;
        width: 67%;
        z-index:100;
        color:white;
        text-align:center;
        margin-bottom:-20px;
        margin-left:33.3%;
    }

    input, button {
        height:50px;
    }

    .progress {
      margin-bottom: -16px;
    }
</style>










