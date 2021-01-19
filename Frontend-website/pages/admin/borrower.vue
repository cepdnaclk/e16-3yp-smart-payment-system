<template>
	<b-container fluid="xl">
        <b-row>
        	<b-col>
        		<h3>Co-Worker Management</h3>
        	</b-col>

        	<b-col cols="5">
        		<b-card class="mt-3" header="Create a Co-Worker" >
        			<b-form @submit="onSubmit" @reset="onReset">
    				<!-- Fname -->
						<b-form-group
							id="id1"
							label="First Name:"
							label-for="fname1"
							description="Enter the first name of the Co-Worker"
							>
							<b-form-input
								id="fname1"
								v-model="form.fname"
								required
								placeholder="Enter First Name"
							></b-form-input>
							<b-form-invalid-feedback :state="fname_validation">
			                	First name only allowes alphabetical characters and length must be less than 21
			                </b-form-invalid-feedback>
						</b-form-group>

						<!-- Lname -->
						<b-form-group
							id="id2"
							label="Last Name:"
							label-for="lname1"
							description="Enter the last name of the Co-Worker"
							>
							<b-form-input
								id="lname1"
								v-model="form.lname"
								required
								placeholder="Enter Last Name"
							></b-form-input>
							<b-form-invalid-feedback :state="lname_validation">
			                	Last name only allowes alphabetical characters and length must be less than 31
			                </b-form-invalid-feedback>
						</b-form-group>

						<!-- Type_Of_Staff -->
						<b-form-group
							id="id3"
							label="Type Of Staff:"
							label-for="tos1"
							description="Select the staff  type of the Co-Worker"
							>
							<b-form-select
								id="tos1"
								v-model="form.typeOfStaff"
								:options="staff_list"
								required
							></b-form-select>
							<b-form-invalid-feedback :state="tos_validation">
			                	Type of staff must be selected and length must be less than 41
			                </b-form-invalid-feedback>
						</b-form-group>


						<!-- Designation -->
						<b-form-group
							id="id4"
							label="Designation:"
							label-for="desi1"
							description="Select the designation of the Co-Worker"
							>
							<b-form-select
								id="desi1"
								v-model="form.designation"
								:options="desi_list"
								required
							></b-form-select>
							<b-form-invalid-feedback :state="desi_validation">
			                	Designation must be selected and length must be less than 41
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
        		<b-card class="mt-3" header="Update a Co-Worker" >
        			<div v-if="beforeFind">
        				<b-form @submit="onSubmit2">
	        				<b-form-group
								id="id5"
								label="Co-Worker ID:"
								label-for="bid2"
								description="Enter the Co-Worker ID that you want to edit"
								>
								<b-form-input
									id="bid2"
									v-model="form2.borrowerId"
									required
									placeholder="Enter Co-Worker ID"
								></b-form-input>
								<b-form-invalid-feedback :state="findkeyid_validation">
				                	Borrower ID must be an integer number
				                </b-form-invalid-feedback>
							</b-form-group>

							<b-row class="justify-content-md-center">
				                <b-col cols="4" class="justify-content-md-center"><b-button block type="submit" :disabled="!findkeyid_validation" variant="success">Find</b-button></b-col>
				                <b-col cols="8"></b-col>
				            </b-row>
				        </b-form>
        			</div>
        			<div v-if="afterFind">






        				<b-form @submit="onSubmit3" @reset="onReset">
        					<!-- Borrower ID -->
							<b-form-group
								id="id6"
								label="Co-Worker ID:"
								label-for="bid3"
								>
								<b-form-input
									id="bid3"
									v-model="form3.borrowerId"
									readonly
									required
								></b-form-input>
							</b-form-group>

	    				<!-- Fname -->
							<b-form-group
								id="id7"
								label="First Name:"
								label-for="fname2"
								description="Enter the first name of the Co-Worker"
								>
								<b-form-input
									id="fname2"
									v-model="form3.fname"
									required
									placeholder="Enter First Name"
								></b-form-input>
								<b-form-invalid-feedback :state="fname_validation2">
				                	First name only allowes alphabetical characters and length must be less than 21
				                </b-form-invalid-feedback>
							</b-form-group>

							<!-- Lname -->
							<b-form-group
								id="id8"
								label="Last Name:"
								label-for="lname2"
								description="Enter the last name of the Co-Worker"
								>
								<b-form-input
									id="lname2"
									v-model="form3.lname"
									required
									placeholder="Enter Last Name"
								></b-form-input>
								<b-form-invalid-feedback :state="lname_validation2">
				                	Last name only allowes alphabetical characters and length must be less than 31
				                </b-form-invalid-feedback>
							</b-form-group>

							<!-- Type_Of_Staff -->
							<b-form-group
								id="id9"
								label="Type Of Staff:"
								label-for="tos2"
								description="Select the staff  type of the Co-Worker"
								>
								<b-form-select
									id="tos2"
									v-model="form3.typeOfStaff"
									:options="staff_list"
									required
								></b-form-select>
								<b-form-invalid-feedback :state="tos_validation2">
				                	Type of staff must be selected and length must be less than 41
				                </b-form-invalid-feedback>
							</b-form-group>


							<!-- Designation -->
							<b-form-group
								id="id10"
								label="Designation:"
								label-for="desi2"
								description="Select the designation of the Co-Worker"
								>
								<b-form-select
									id="desi2"
									v-model="form3.designation"
									:options="desi_list"
									required
								></b-form-select>
								<b-form-invalid-feedback :state="desi_validation2">
				                	Designation must be selected and length must be less than 41
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
					fname: '',
					lname: '',
					typeOfStaff: '',
					designation: ''
				},
				form2: {
					borrowerId: '',
				},
				form3: {
					borrowerId: '',
					fname: '',
					lname: '',
					typeOfStaff: '',
					designation: ''
				},
				staff_list: [{ text: '-- Select One --', value: null }, 'Academic Staff', 'NonAcademic Staff', 'Other'],
				desi_list: [{ text: '-- Select One --', value: null }, 'Lecturer', 'Instructor', 'Technical Officer', 'Senior Technical Officer', 'Lab Assistant', 'Student', 'Other'],
				beforeFind: true,
				afterFind: false,
			}
		},
		computed: {
			fname_validation() {
				if (this.form.fname == '')
					return true
				else{
					var letters = /^[a-zA-Z]+$/
					return (this.form.fname.match(letters) && this.form.fname.length < 21) ? true : false
				}
			},
			// fname_validation2() {
			// 	if (this.form3.fname == '')
			// 		return true
			// 	else{
			// 		var letters = /^[a-zA-Z]+$/
			// 		return (this.form.fname3.match(letters) && this.form3.fname.length < 21) ? true : false
			// 	}
			// },
			lname_validation() {
				if (this.form.lname == '')
					return true
				else{
					var letters = /^[a-zA-Z]+$/
					return (this.form.lname.match(letters) && this.form.lname.length < 31) ? true : false
				}
			},
			// lname_validation2() {
			// 	if (this.form3.lname == '')
			// 		return true
			// 	else{
			// 		var letters = /^[a-zA-Z]+$/
			// 		return (this.form3.lname.match(letters) && this.form3.lname.length < 31) ? true : false
			// 	}
			// },
			tos_validation() {
				if (this.form.typeOfStaff == '')
		          return true
		        else {
		          var allowed_lits = ['Academic Staff', 'NonAcademic Staff', 'Other']
		          return (allowed_lits.includes(this.form.typeOfStaff) && this.form.typeOfStaff.length < 41) ? true : false
		        }    
			},
			tos_validation2() {
				if (this.form3.typeOfStaff == '')
		          return true
		        else {
		          var allowed_lits = ['Academic Staff', 'NonAcademic Staff', 'Other']
		          return (allowed_lits.includes(this.form3.typeOfStaff) && this.form3.typeOfStaff.length < 41) ? true : false
		        }    
			},
			desi_validation() {
				if (this.form.designation == '')
		          return true
		        else {
		          var allowed_lits = ['Lecturer', 'Instructor', 'Technical Officer', 'Senior Technical Officer', 'Lab Assistant', 'Student', 'Other']
		          return (allowed_lits.includes(this.form.designation) && this.form.designation.length < 41) ? true : false
		        }
			},
			desi_validation2() {
				if (this.form3.designation == '')
		          return true
		        else {
		          var allowed_lits = ['Lecturer', 'Instructor', 'Technical Officer', 'Senior Technical Officer', 'Lab Assistant', 'Student', 'Other']
		          return (allowed_lits.includes(this.form3.designation) && this.form3.designation.length < 41) ? true : false
		        }
			},
			validate() {
				return (this.fname_validation && this.lname_validation && this.tos_validation && this.desi_validation) ? false : true
			},

			findkeyid_validation() {
				if (this.form2.borrowerId == '')
					return true
				else{
					var letters = /^[a-zA-Z]+$/
					return (!this.form2.borrowerId.match(letters)) ? true : false
				}
			},			
			validate2() {
				return (this.form3.fname != '' && this.form3.lname != '' && this.tos_validation2 && this.desi_validation2) ? false : true
			}
		},
		methods: {

			async onSubmit(evt) {
				evt.preventDefault()
				await this.$axios
					.post('/borrower/register', this.form)
					.then((res) => {
					// console.log(res.data.msg)
					this.form.fname = ''
					this.form.lname = ''
					this.form.typeOfStaff = ''
					this.form.designation = ''
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
					.post('/borrower/getborrower', this.form2)
					.then((res) => {
					this.$notifier.showMessage({ content: `Borrower ID ${res.data.Borrower_ID} is found`, color: 'success' })
					
					this.beforeFind = false

					this.form3.borrowerId = res.data.Borrower_ID
					this.form3.fname = String(res.data.FName)
					this.form3.lname = String(res.data.LName)
					this.form3.typeOfStaff = res.data.Type_Of_Staff
					this.form3.designation = res.data.Designation

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
					.post('/borrower/update', this.form3)
					.then((res) => {
					this.$notifier.showMessage({ content: `Successfully Updated`, color: 'success' })
					this.afterFind = false
					this.form2.borrowerId = ''
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
				this.form.fname = ''
				this.form.lname = ''
				this.form.typeOfStaff = ''
				this.form.designation = ''
	      	},
	      	testclear() {
	      		this.afterFind = false
	      		this.form2.borrowerId = ''
	      		this.beforeFind = true
	      	}
		},
		middleware: 'auth-admin'
	}
</script>