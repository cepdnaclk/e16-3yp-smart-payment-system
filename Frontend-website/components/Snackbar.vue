<template>
  <v-snackbar v-model="show" :color="color"  :top="y === 'top'">
    {{ message }}
    <v-btn text @click="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      isSmall: true,
      message: '',
      color: '',
      x: null,
      y: 'top'
    }
  },
  
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.content
        this.color = state.snackbar.color
        this.show = true
        this.y = 'top'

      }
    })
  }
}
</script>