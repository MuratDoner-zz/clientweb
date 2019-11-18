<template>
    <v-app>

        <Chat/>

    </v-app>
</template>

<script>

    import Chat from "./pages/Chat.vue";

    export default {
        name: 'App',
        components: {
            Chat,
        },
        data: () => ({
            //
        }),
    };
</script>
