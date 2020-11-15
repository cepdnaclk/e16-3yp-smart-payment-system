<template>
  <v-app>
    <Snackbar></Snackbar>
  	<div>
  		<Navbar/>
  		<nuxt/>
  	</div>
  </v-app>
</template>

<style>

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #fff;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.inner-boarder {
	box-shadow: 0px 0px 12px 1px #27ae60;
	border-radius: 15px;
  /*background: linear-gradient(600deg,#00bcd4,#060c21,#00bcd4);*/
}

</style>

<script>
import Navbar from '~/components/Navbar'
import Snackbar from '~/components/Snackbar.vue'
export default {
  components: {
    Navbar,
    Snackbar
  }
}
</script>