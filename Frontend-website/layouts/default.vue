<template>
  <v-app>
    <Snackbar></Snackbar>
    <div>
      <Nuxt />
    </div>
  </v-app>
</template>

<script>
  import Snackbar from '~/components/Snackbar.vue'

  export default {
    components: { Snackbar }
  }
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.back-ground {
  color: #000;
  background: #fff;
  /*background: linear-gradient(30deg,#00bcd4,#060c21,#00bcd4);*/

}

.outer-boarder {
  box-shadow: 0px 0px 3px 2px #060c21;
  background: linear-gradient(560deg,#00bcd4,#060c21,#00bcd4);
  /* 89ff00 */
}

.inner-boarder {
	box-shadow: 0px 0px 12px 1px #27ae60;
	border-radius: 15px;
  /*background: linear-gradient(600deg,#00bcd4,#060c21,#00bcd4);*/
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
