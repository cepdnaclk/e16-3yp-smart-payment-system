<template>
    <div>
        <h1>{{user}}</h1>
        <v-btn color="primary" @click="$auth.logout()"> Logout </v-btn>
    </div>
</template>

<script>
export default {
    // middleware: 'auth-admin'
    data(){
        return {
            user: this.$auth.user
        }
    },
    methods: {
    quitnow () {
      this.$notifier.showMessage({ content: 'Hello, snackbar lets see ado meka weda karana widiya hariyatama sure nane bokka kohomada meka karanne multilike they say in the documentation  line os work', color: 'error' })
    }
  },
}
</script>

<style>

</style>