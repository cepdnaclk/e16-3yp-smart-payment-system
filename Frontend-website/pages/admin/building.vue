<template>
	<b-container fluid="xl">
        <b-row>
        	<b-col>
        		<h3>Center Management</h3>
        	</b-col>

        	<b-col cols="5">
        		<b-card class="mt-3" header="Create a Center" >
        			<b-form @submit="onSubmit" @reset="onReset">
    				<!-- Key ID -->
						<b-form-group
							id="id1"
							label="Center ID:"
							label-for="buildingID1"
							description="Enter an integer as a building id"
							>
							<b-form-input
								id="buildingID1"
								v-model="form.buildingID"
								required
								placeholder="Enter Center ID"
							></b-form-input>
							<b-form-invalid-feedback :state="buildingID_validation">
			                	Center ID must be an integer number
			                </b-form-invalid-feedback>
						</b-form-group>

					<!-- no of keys -->
						<b-form-group
							id="id2"
							label="Center Name:"
							label-for="buildingName1"
							description="Name of the Center"
							>
							<b-form-input
								id="buildingName1"
								v-model="form.buildingName"
								required
								placeholder="Enter Center Name"
							></b-form-input>
						</b-form-group>

					<!-- keyID -->
						<b-form-group
			                id="id3" 
			                label="keyID:" 
			                label-for="keyID1"
			                description="Key id that you allocated to this Center"
			                >
			                <b-form-input
			                  id="keyID1"
			                  v-model="form.keyID"
			                  placeholder="Enter Key ID"
			                  required
			                ></b-form-input>
			                <b-form-invalid-feedback :state="keyID_validation">
			                  keyID must be an integer number
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
        		<b-card class="mt-3" header="Update a Center" >
        			<div v-if="beforeFind">
        				<b-form @submit="onSubmit2">
	        				<b-form-group
								id="id4"
								label="Center ID:"
								label-for="buildingID2"
								description="Enter the Center ID that you want to edit"
								>
								<b-form-input
									id="buildingID2"
									v-model="form2.buildingID"
									required
									placeholder="Enter Center ID"
								></b-form-input>
								<b-form-invalid-feedback :state="findbuildingID_validation">
				                	Building ID must be an integer number
				                </b-form-invalid-feedback>
							</b-form-group>

							<b-row class="justify-content-md-center">
				                <b-col cols="4" class="justify-content-md-center"><b-button block type="submit" :disabled="!findbuildingID_validation" variant="success">Find</b-button></b-col>
				                <b-col cols="8"></b-col>
				            </b-row>
				        </b-form>
        			</div>
        			<div v-if="afterFind">

        				<b-form @submit="onSubmit3">
	    				<!-- Key ID -->
							<b-form-group
								id="id5"
								label="Center ID:"
								label-for="buildingID1"
								description="Enter an integer as a Center id"
								>
								<b-form-input
									id="buildingID1"
									v-model="form3.buildingID"
									readonly
									required
									placeholder="Enter Center ID"
								></b-form-input>
							</b-form-group>

						<!-- no of keys -->
							<b-form-group
								id="id6"
								label="Center Name:"
								label-for="buildingName11"
								description="Name of the Center"
								>
								<b-form-input
									id="buildingName11"
									v-model="form3.buildingName"
									required
									placeholder="Enter Center Name"
								></b-form-input>
							</b-form-group>

						<!-- keyID -->
							<b-form-group
				                id="id7" 
				                label="keyID:" 
				                label-for="keyID1"
				                >
				                <b-form-input
				                  id="keyID1"
				                  v-model="form3.keyID"
				                  placeholder="Enter Key ID"
				                  required
				                ></b-form-input>
				                <b-form-invalid-feedback :state="keyID_validation2">
				                  keyID must be an integer number
				                </b-form-invalid-feedback>
				             </b-form-group>

				            <b-row class="justify-content-md-center">
				                <b-col cols="2"></b-col>
				                <b-col cols="4" class="justify-content-md-center"><b-button block type="submit" :disabled="validate" variant="info">Submit</b-button></b-col>
				                <b-col cols="4" class="justify-content-md-center"><b-button @click="testclear()" block  variant="warning">Cancel</b-button></b-col>
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
					buildingID: '',
					buildingName: '',
					keyID: ''
				},
				form2: {
					buildingID: ''
				},
				form3: {
					buildingID: '',
					buildingName: '',
					keyID: ''
				},
				beforeFind: true,
				afterFind: false,
			}
		},
		computed: {
			buildingID_validation() {
				if (this.form.buildingID == '')
					return true
				else{
					var letters = /^[0-9]+$/
					return (this.form.buildingID.match(letters)) ? true : false
				}
			},
			findbuildingID_validation() {
				if (this.form2.buildingID == '')
					return true
				else{
					var letters = /^[0-9]+$/
					return (this.form2.buildingID.match(letters)) ? true : false
				}
			},
			keyID_validation() {
				if (this.form.keyID == '')
		          return true
		        else {
		         var letters = /^[0-9]+$/
		          return (this.form.keyID.match(letters)) ? true : false
		        }    
			},
			keyID_validation2() {
				if (this.form3.keyID == '')
		          return true
		        else {
		          var letters = /^[0-9]+$/
		          return (this.form3.keyID.match(letters)) ? true : false
		        }    
			},
			validate() {
				return (this.buildingID_validation && this.keyID_validation) ? false : true
			},
			validate2() {
				return (this.keyID_validation2) ? false : true
			}
		},
		methods: {

			async onSubmit(evt) {
				evt.preventDefault()
				await this.$axios
					.post('/building/register', this.form)
					.then((res) => {
					// console.log(res.data.msg)
					this.form.buildingID = ''
					this.form.buildingName = ''
					this.form.keyID = ''
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
					.post('/building/getbyid', this.form2)
					.then((res) => {
					this.$notifier.showMessage({ content: `Key ID ${res.data.Building_ID} is found`, color: 'success' })
					this.beforeFind = false

					this.form3.buildingID = res.data.Building_ID
					this.form3.buildingName = res.data.Building_Name
					this.form3.keyID = String(res.data.Key_ID)

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
					.post('/building/update', this.form3)
					.then((res) => {
					this.$notifier.showMessage({ content: `Successfully Updated`, color: 'success' })
					this.afterFind = false
					this.form2.buildingID = ''
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
				this.form.buildingID = ''
				this.form.buildingName = ''
				this.form.keyID = ''
	      	},
	      	testclear() {
	      		this.afterFind = false
	      		this.form2.buildingID = ''
	      		this.beforeFind = true
	      	}
		},
		middleware: 'auth-admin'
	}
</script>