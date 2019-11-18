<template>
    <div id="app">

        <v-navigation-drawer
                v-model="drawer"
                app
        >


            <Sidebar></Sidebar>
        </v-navigation-drawer>



        <v-app-bar
                app
                color="indigo"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>
        <v-content>
            <Messages></Messages>
        </v-content>
    </div>


</template>


<script>

    export default {
        name: 'frame-chat',
        drawer: null

    }
</script>

<script>
    import Sidebar from '../sidebar/Sidebar'
import Messages from '../messages/Messages'
export default {

    name: 'Chat',
    components: {Messages, Sidebar},
    pages: {Sidebar, Messages}

}
</script>


