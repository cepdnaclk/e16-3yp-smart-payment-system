<template>
	<div>
        <!-- class="outer-boarder" -->
		<b-container>
			<br>
			<br>
			<b-row class="justify-content-md-center">
				<b-col></b-col>
                <!-- class="inner-boarder" -->
				<b-col lg="4" cols="5">		
					<br>
					<b-row class="justify-content-md-center">
						<b-col cols="3"></b-col>
						<b-col cols="6">
							<h2 style="text-align:center">Login</h2>
						</b-col>
						<b-col cols="3"></b-col>
					</b-row>
					<br>

					<b-form @submit.prevent="onSubmit" @reset="onReset">
						<b-form-group
							id="email_title"
							label="Email:"
							label-for="email"
							>
							<b-form-input
								id="email"
								v-model="form.email"
								type="email"
								required
								placeholder="Enter Email"
							></b-form-input>
						</b-form-group>

						<b-form-group
							id="password_title"
							label="Password:"
							label-for="password"
							description="We'll never share your password with anyone else."
							>
							<b-form-input
								id="password"
								v-model="form.password"
								type="password"
								required
								placeholder="Enter Password"
							></b-form-input>
						</b-form-group>

						<b-row class="justify-content-md-center">
							<!-- <b-col cols=""></b-col> -->
							<b-col md="5" cols="12" class="justify-content-md-center"><b-button block type="submit" :disabled="validate" variant="outline-success">Login</b-button></b-col>
							<b-col md="5" cols="12" class="justify-content-md-center"><b-button block type="reset" variant="outline-warning">Reset</b-button></b-col>
							<!-- <b-col cols=""></b-col> -->
						</b-row>
					</b-form>
					<br>
					<p>
						Don't have an Account <nuxt-link to="register">
							Signup here
						</nuxt-link>
						<br>
						Forgot password? <nuxt-link to="">
							Click here
						</nuxt-link>
					</p>

					<br>
				</b-col>
				<b-col></b-col>
				<br>
			</b-row>
			<br>
		</b-container>
	</div>
</template>

<style>

</style>

<script>
// import axios from 'axios'

	export default {
		data() {
			    
			return {
				form: {
					email: '',
					password: '',
				}
			
			}
		},

		computed: {
			validate() {
				return (this.form.email && this.form.password) ? false : true
			},
		},

		methods: {
		
			async onSubmit() {
				try {
		          await this.$auth.loginWith('local', {
		            data: this.form
		          })
    			  this.$notifier.showMessage({ content: `Welcome ${this.$auth.user.name}`, color: 'success' })
			   
			   console.log(this.$auth.user)	      
		        this.$router.push('/api/user')
		        } catch (err) {
		        	// console.log(err)
		        	// this.$bvToast.toast(err.response.data.message, {
			        //   autoHideDelay: 5000,
			        //   variant: 'danger',
			        //   toaster: 'b-toaster-top-center',
			        //   title: 'Login Failed',
			        //   appendToast: false
					// })
					
    			  this.$notifier.showMessage({ content: `Error: ${err.response.data.message}`, color: 'error' })


		        	this.form.email = ''
					this.form.password = ''
		        }		
			},
			onReset(evt) {
				evt.preventDefault()
				this.form.email = ''
				this.form.password = ''
			}
		},
		
		name: 'LoginForm'
	}
</script>