<template>
  <div>
    <v-btn color="primary" @click="showSnackbar">
      Show snackbar
    </v-btn>
    
  </div>
</template>

<script>
export default {
  methods: {
    showSnackbar () {
      this.$notifier.showMessage({ content: 'Hello, snackbar lets see ado meka weda karana widiya hariyatama sure nane bokka kohomada meka karanne multilike they say in the documentation  line os work', color: 'error' })
    }
  },
  auth: false
}
</script>