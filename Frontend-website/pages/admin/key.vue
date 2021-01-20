<template>
	<b-container fluid="xl">
        <b-row>
        	<b-col>
        		<h3>Card Management</h3>
        	</b-col>

        	<b-col cols="5">
        		<b-card class="mt-3" header="Create a Card" >
        			<b-form @submit="onSubmit" @reset="onReset">
    				<!-- Key ID -->
						<b-form-group
							id="id1"
							label="Card ID:"
							label-for="keyid"
							description="Enter an integer as a Card id"
							>
							<b-form-input
								id="keyid"
								v-model="form.keyID"
								required
								placeholder="Enter Card ID"
							></b-form-input>
							<b-form-invalid-feedback :state="keyid_validation">
			                	Key ID must be an integer number
			                </b-form-invalid-feedback>
						</b-form-group>

					<!-- no of keys -->
						<b-form-group
							id="id2"
							label="No Of Copies:"
							label-for="noofkeys"
							description="Enter the number of copies that have in the card set"
							>
							<b-form-input
								id="noofkeys"
								v-model="form.noOfKeys"
								required
								placeholder="Enter Number of Copies"
							></b-form-input>
							<b-form-invalid-feedback :state="noofkeys_validation">
			                  No of Keys must be an integer number
			                </b-form-invalid-feedback>
						</b-form-group>

					<!-- availability -->
						<b-form-group
			                id="id3" 
			                label="Availability:" 
			                label-for="availability1"
			                description="Select whether the Card is available or not"
			                >
			                <b-form-select
			                  id="availability1"
			                  v-model="form.availability"
			                  :options="availability_list"
			                  required
			                ></b-form-select>
			                <b-form-invalid-feedback :state="availability_validation">
			                  Availability state must be selected
			                </b-form-invalid-feedback>
			             </b-form-group>

			            <b-row class="justify-content-md-center">
			                <b-col cols="2"></b-col>
			                <b-col cols="4" class="justify-content-md-center"><b-button block type="submit" :disabled="validate" variant="info">Submit</b-button></b-col>
			                <b-col cols="4" class="justify-content-md-center"><b-button block type="reset" variant="danger">Reset</b-button></b-col>
			                <b-col cols="2"></b-col>
			            </b-row>

        			</b-form>
        		</b-card>
        	</b-col>
        		
        	<b-col cols="5">
        		<!-- something can be done here -->
        		<b-card class="mt-3" header="Update a Card" >
        			<div v-if="beforeFind">
        				<b-form @submit="onSubmit2">
	        				<b-form-group
								id="id4"
								label="Card ID:"
								label-for="keyid2"
								description="Enter the Card ID that you want to edit"
								>
								<b-form-input
									id="keyid2"
									v-model="form2.keyID"
									required
									placeholder="Enter Card ID"
								></b-form-input>
								<b-form-invalid-feedback :state="findkeyid_validation">
				                	Card ID must be an integer number
				                </b-form-invalid-feedback>
							</b-form-group>

							<b-row class="justify-content-md-center">
				                <b-col cols="4" class="justify-content-md-center"><b-button block type="submit" :disabled="!findkeyid_validation" variant="success">Find</b-button></b-col>
				                <b-col cols="8"></b-col>
				            </b-row>
				        </b-form>
        			</div>
        			<div v-if="afterFind">

        				<b-form @submit="onSubmit3">
	    				<!-- Key ID -->
							<b-form-group
								id="id5"
								label="Card ID:"
								label-for="keyid3"
								>
								<b-form-input
									id="keyid3"
									v-model="form3.keyID"
									readonly
									required
								></b-form-input>
							</b-form-group>

						<!-- no of keys -->
							<b-form-group
								id="id6"
								label="No Of Copies:"
								label-for="noofkeys3"
								description="Enter the number of Copies that have in the card set"
								>
								<b-form-input
									id="noofkeys3"
									v-model="form3.noOfKeys"
									required
									placeholder="Enter Number of Copies"
								></b-form-input>
								<b-form-invalid-feedback :state="noofkeys_validation2">
				                  No of Copies must be an integer number
				                </b-form-invalid-feedback>
							</b-form-group>

						<!-- availability -->
							<b-form-group
				                id="id7" 
				                label="Availability:" 
				                label-for="availability3"
				                description="Select whether the card is available or not"
				                >
				                <b-form-select
				                  id="availability3"
				                  v-model="form3.availability"
				                  :options="availability_list"
				                  required
				                ></b-form-select>
				                <b-form-invalid-feedback :state="availability_validation2">
				                  Availability state must be selected
				                </b-form-invalid-feedback>
				             </b-form-group>

				            <b-row class="justify-content-md-center">
				                <b-col cols="2"></b-col>
				                <b-col cols="4" class="justify-content-md-center"><b-button block type="submit" :disabled="validate2" variant="info">Update</b-button></b-col>
				                <b-col cols="4" class="justify-content-md-center"><b-button @click="testclear()" block variant="warning">Cancel</b-button></b-col>
				                <b-col cols="2"></b-col>
				            </b-row>

	        			</b-form>

        			</div>
        		</b-card>
        	</b-col>
        </b-row>
	</b-container>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					keyID: '',
					noOfKeys: '',
					availability: ''
				},
				form2: {
					keyID: ''
				},
				form3: {
					keyID: '',
					noOfKeys: '',
					availability: ''
				},
				availability_list: [{ text: '-- Select One --', value: null }, 'Available', 'NotAvailable'],
				beforeFind: true,
				afterFind: false,
			}
		},
		computed: {
			keyid_validation() {
				if (this.form.keyID == '')
					return true
				else{
					var letters = /^[0-9]+$/
					return (this.form.keyID.match(letters)) ? true : false
				}
			},
			noofkeys_validation2() {
				if (this.form3.noOfKeys == '')
					return true
				else{
					var letters = /^[0-9]+$/
					return (this.form3.noOfKeys.match(letters)) ? true : false
				}
			},
			noofkeys_validation() {
				if (this.form.noOfKeys == '')
					return true
				else{
					var letters = /^[0-9]+$/
					return (this.form.noOfKeys.match(letters)) ? true : false
				}
			},
			findkeyid_validation() {
				if (this.form2.keyID == '')
					return true
				else{
					var letters = /^[0-9]+$/
					return (this.form2.keyID.match(letters)) ? true : false
				}
			},
			availability_validation() {
				if (this.form.availability == '')
		          return true
		        else {
		          var allowed_lits = ['Available', 'NotAvailable']
		          return (allowed_lits.includes(this.form.availability)) ? true : false
		        }    
			},
			availability_validation2() {
				if (this.form3.availability == '')
		          return true
		        else {
		          var allowed_lits = ['Available', 'NotAvailable']
		          return (allowed_lits.includes(this.form3.availability)) ? true : false
		        }    
			},
			validate() {
				return (this.keyid_validation && this.noofkeys_validation && this.availability_validation) ? false : true
			},
			validate2() {
				return (this.noofkeys_validation2 && this.availability_validation2) ? false : true
			}
		},
		methods: {

			async onSubmit(evt) {
				evt.preventDefault()
				await this.$axios
					.post('/key/register', this.form)
					.then((res) => {
					// console.log(res.data.msg)
					this.form.keyID = ''
					this.form.noOfKeys = ''
					this.form.availability = ''
					this.$notifier.showMessage({ content: `${res.data.msg}`, color: 'success' })
				})
				.catch((err) => {
				// bad request
					if (err.response.status == 400)
				// console.log(err.response.data.errors.message)
						this.$notifier.showMessage({ content: `${err.response.data.errors.message}`, color: 'error' })
				// conflict
					else {
				// console.log(err.response.data.Error)
						this.$notifier.showMessage({ content: `${err.response.data.Error}`, color: 'error' })
					}
				})
			},
			async onSubmit2(evt) {
				evt.preventDefault()
				await this.$axios
					.post('/key/getkey', this.form2)
					.then((res) => {
					this.$notifier.showMessage({ content: `Key ID ${res.data.Key_ID} is found`, color: 'success' })
					this.beforeFind = false

					this.form3.keyID = res.data.Key_ID
					this.form3.noOfKeys = String(res.data.No_Of_Keys)
					this.form3.availability = (res.data.Availability) ? 'Available' : 'NotAvailable'

					this.afterFind = true
				})
				.catch((err) => {
				// bad request
					if (err.response.status == 400)
				// console.log(err.response.data.errors.message)
						this.$notifier.showMessage({ content: `${err.response.data.errors.message}`, color: 'error' })
				// conflict
					else {
				// console.log(err.response.data.Error)
						this.$notifier.showMessage({ content: `${err.response.data.Error}`, color: 'error' })
					}
				})
			},
			async onSubmit3(evt) {
				evt.preventDefault()
				await this.$axios
					.post('/key/update', this.form3)
					.then((res) => {
					this.$notifier.showMessage({ content: `Successfully Updated`, color: 'success' })
					this.afterFind = false
					this.form2.keyID = ''
					this.beforeFind = true

					
				})
				.catch((err) => {
				// bad request
					if (err.response.status == 400)
				// console.log(err.response.data.errors.message)
						this.$notifier.showMessage({ content: `${err.response.data.errors.message}`, color: 'error' })
				// conflict
					else {
				// console.log(err.response.data.Error)
						this.$notifier.showMessage({ content: `${err.response.data.Error}`, color: 'error' })
					}
				})
			},
			onReset(evt) {
				evt.preventDefault()
				this.form.keyID = ''
				this.form.noOfKeys = ''
				this.form.availability = ''
	      	},
	      	testclear() {
	      		this.afterFind = false
	      		this.form2.keyID = ''
	      		this.beforeFind = true
	      	}
		},
		middleware: 'auth-admin'
	}
</script>