<template>
  <b-container fluid="xl">
    <div>
      <b-embed type="video" aspect="16by9" controls poster="thumbnail.png">
        <!-- <source src="Key_1.webm" type="video/webm"> -->
        <source src="Key_1.mp4" type="video/mp4">
      </b-embed>
    </div>
  </b-container>
</template>

<style scoped>
  .intro {
    background: linear-gradient(600deg,#00bcd4,#060c21,#00bcd4);
  }
</style>



<script>
export default {
 middleware: 'guest'
}
</script>


</style>
