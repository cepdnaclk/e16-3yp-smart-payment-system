<template>
  <div>
    <b-container fluid>
        <br>
      <b-row class="justify-content-md-center">
        <b-col></b-col>
        <b-col sm="8" md="6" lg="5" class="inner-boarder">
          <div class="regheader">
            <br>
            <br>
            <h2 style="text-align:center">Registration Form</h2>
<!-- Form begin -->
            <b-form @submit.stop.prevent="onSubmit" @reset="onReset">
<!-- Email input -->
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
                >
                </b-form-input>
                <b-form-invalid-feedback :state="email_validation">
                  Email length must be less than 61 characters and must end with ".com" or ".lk"
                </b-form-invalid-feedback>
              </b-form-group>

<!-- First Name -->
              <b-form-group
                id="fname_title"
                label="First name:"
                label-for="fname"
                >
                <b-form-input
                  id="fname"
                  v-model="form.fname"
                  required
                  placeholder="Enter Your First Name"
                >
                </b-form-input>
                <b-form-invalid-feedback :state="fname_validation">
                  Only allows Alphabetical Characters and length must be less than 21
                </b-form-invalid-feedback>
              </b-form-group>

<!-- Last Name -->
              <b-form-group
                id="lname_title"
                label="Last name:"
                label-for="lname"
                >
                <b-form-input
                  id="lname"
                  v-model="form.lname"
                  required
                  placeholder="Enter Your Last Name"
                ></b-form-input>
                <b-form-invalid-feedback :state="lname_validation">
                 Only allows Alphabetical Characters and length must be less than 31
                </b-form-invalid-feedback>
              </b-form-group>  

<!-- Designation -->
              <b-form-group
                id="designation_title" 
                label="Designation:" 
                label-for="designationID"
                >
                <b-form-select
                  id="designationID"
                  v-model="form.designation"
                  :options="desi_list"
                  required
                ></b-form-select>
                <b-form-invalid-feedback :state="designation_validation">
                  Designation must be selected
                </b-form-invalid-feedback>
              </b-form-group> 

<!-- Password -->
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
                <b-form-invalid-feedback :state="password_validation">
                  Only allows Alphabetical Characters and length must be in between 6-20
                </b-form-invalid-feedback>
              </b-form-group>
<!-- Confirm Password -->
              <b-form-group
                id="comfirm_password_title"
                label="Confirm Password:"
                label-for="confirm_password"
                >
                <b-form-input
                  id="confirm_password"
                  v-model="confirm_password"  
                  type="password"
                  required
                  placeholder="Re-Enter Password"
                ></b-form-input>
                <b-form-invalid-feedback :state="con_password_validation">
                  Password is not companion.
                </b-form-invalid-feedback>
              </b-form-group>

<!-- License Agreement -->
              <b-row class="justify-content-md-center">
                <b-form-checkbox 
                  id="agreement"
                  v-model="agreeability"
                  value="set"
                  unchecked-value=""
                  >
                  By creating an account you agree to our
                    <nuxt-link to="#" target="_blank">
                      Terms & Conditions
                    </nuxt-link>
                    <b-form-invalid-feedback :state="license_validation">
                      You must agree the Terms & Conditions in order to enjoy our services
                    </b-form-invalid-feedback>
                </b-form-checkbox>
                
              </b-row>
              <br>

<!-- Buttons -->
              <b-row class="justify-content-md-center">
                <b-col cols="2"></b-col>
                <b-col cols="4" class="justify-content-md-center"><b-button block type="submit" :disabled="validate" variant="outline-info">Submit</b-button></b-col>
                <b-col cols="4" class="justify-content-md-center"><b-button block type="reset" variant="outline-info">Reset</b-button></b-col>
                <b-col cols="2"></b-col>
              </b-row>
              <br>
            </b-form>
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>
      <br>
    </b-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          fname: '',
          lname: '',
          password: '',
          designation: ''
        },
        desi_list: [{ text: '-- Select One --', value: null }, 'Chief Security Officer', 'Security Officer', 'Other'],
        confirm_password: '',
        agreeability: '',
      }
    },
    computed: {
      email_validation() {
        if (this.form.email === '')
          return true
        else {
          let prefix = this.form.email.split("@")
          if (prefix.length != 2 || this.form.email.length > 60)
            return false
          else {
            let domain = prefix[1].split(".")
            let i = domain.length
            if (i < 2)
              return false
            else {
              if (domain[i-1] != 'com' && domain[i-1] != 'lk')
                return false
              else {
                return (prefix[0] == '' || domain[0] == '') ? false : true
              }
            }
          }
        }
      },
      fname_validation() {
        if (this.form.fname === '')
          return true
        else {
          var letters = /^[a-zA-Z]+$/
          return (!this.form.fname.match(letters) || this.form.fname.length > 20) ? false : true
        }        
      },

      lname_validation() {
        if (this.form.lname === '')
          return true
        else {
          var letters = /^[a-zA-Z]+$/
          return (!this.form.lname.match(letters) || this.form.lname.length > 30) ? false : true  
        }  
      },

      designation_validation() {
        if (this.form.designation == '')
          return true
        else {
          var allowed_lits = ['Chief Security Officer', 'Security Officer', 'Other']
          return (allowed_lits.includes(this.form.designation)) ? true : false
        }        
      },

      password_validation() {
        if (this.form.password == '')
          return true
        else {
          var letters = /^[0-9a-zA-Z]+$/
          return (!this.form.password.match(letters) || this.form.password.length > 20 || this.form.password.length < 6) ? false : true
        }
      },

      con_password_validation() {
        return (this.form.password === this.confirm_password) ? true : false
      },

      license_validation() {
        return (this.agreeability==='set') ? true : false
      },

      validate() {
        return (this.email_validation && this.fname_validation && this.lname_validation && this.password_validation && this.con_password_validation && this.license_validation) ? false : true
      }

    },
    methods: {
      async onSubmit() {
       await this.$axios
          .post('register', this.form)
          .then((res) => {
            // console.log(res.data.msg)
            // this.$notifier.showMessage({ content: `${res.data.msg}`, color: 'success' })
            this.$router.push('/login')

          })
          .catch((err) => {
          // bad request
            if (err.response.status == 400)
              // console.log(err.response.data.errors.message)
              this.$notifier.showMessage({ content: `Error: ${err.response.data.errors.message}`, color: 'error' })
          // conflict
            else {
              // console.log(err.response.data.Error)
              this.$notifier.showMessage({ content: `Error: ${err.response.data.Error}`, color: 'error' })
            }
          })
      },
      onReset(evt) {
        evt.preventDefault()
          this.form.email = ''
          this.form.fname = ''
          this.form.lname = ''
          this.form.password = ''
          this.form.designation = ''
          this.confirm_password= ''
          this.agreeability = null
      }
    },
    middleware: 'guest'
  }
</script>