<template>
	<div>
		<b-row class="dark-background">
	      <b-col cols="12" class="footercontrols">
	        <p><nuxt-link to="" variant="danger">Terms & Conditions</nuxt-link> | <nuxt-link to="">Contact Us</nuxt-link> | <nuxt-link to="">FAQ</nuxt-link></p>
	      </b-col>
	    </b-row>
	</div>
</template>

<style scoped>

.footercontrols {
  text-align: center;
  margin-top:10px;
  color: #fff;
}
</style>

<script>
	export default {
		name : 'Footer'
	}
</script>