<template>
    <div id="app">

        <v-navigation-drawer
                v-model="drawer"
                app
        >


            <v-list dense>
                <v-list-item click="">
                    <v-list-item-action>
                        <v-icon>home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item click="">
                    <v-list-item-action>
                        <v-icon>contact_mail</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Contact</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>



        <v-app-bar
                app
                color="indigo"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

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

    pages: {Sidebar, Messages}

}
</script>


<style scoped>
    .sidebar {
        width: 33.5%;
        display: block;
        float: left;
        position: fixed;
        height: 100%;
        background: #ffffff;
        padding-top: 2em;
        overflow: scroll;
    }

    .content {
        width: 66%;
        display: block;
        float: left;
        margin-left: 34%;
    }
</style>