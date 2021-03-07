<template>
  <card style="width: 50rem;">
    <h5 slot="header" class="title">Register Form</h5>
    <form @submit.prevent="onSubmit" @reset="onReset">
      <div class="row">
        <div class="col-md-5">
          <base-input
            type="email"
            label="Email"
            :required="true"
            placeholder="Enter Your Email"
            v-model="form.email"
          >
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input
            type="text"
            label="First Name"
            :required="true"
            placeholder="Your First Name"
            v-model="form.fname"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            type="text"
            label="Last Name"
            :required="true"
            placeholder="Your Last Name"
            v-model="form.lname"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input
            type="password"
            label="Password"
            :required="true"
            placeholder="Enter Your Password Here"
            v-model="form.password"
          >
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input
            type="password"
            label="Confirm Password"
            :required="true"
            placeholder="Confirm Your Password"
            v-model="confirm_password"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            type="text"
            label="NIC"
            :required="true"
            placeholder="Enter Your NIC"
            v-model="form.nic"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-2">
          <base-button native-type="submit" type="info" class="btn-fill">
            Submit
          </base-button>
        </div>
        <!-- <div class="col-md-2">
        </div> -->
        <div class="col-md-1">
          <base-button native-type="reset" type="danger" class="btn-fill">
            Reset
          </base-button>
        </div>
      </div>

      <div class="row">
<!-- agreebility eka methenna enna one -->
      </div>
    </form>
  </card>



<!-- License Agreement -->
        <!-- <b-row class="justify-content-md-center">
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
        <br> -->


</template>

<script>
  export default {
    auth: 'guest',
    layout: 'normal',
    data() {
      return {
        form: {
          email: '',
          fname: '',
          lname: '',
          password: '',
          nic: ''
        },
        confirm_password: '',
        // agreeability: '',
      }
    },
    computed: {
      // email_validation() {
      //   if (this.form.email === '')
      //     return true
      //   else {
      //     let prefix = this.form.email.split("@")
      //     if (prefix.length != 2 || this.form.email.length > 60)
      //       return false
      //     else {
      //       let domain = prefix[1].split(".")
      //       let i = domain.length
      //       if (i < 2)
      //         return false
      //       else {
      //         if (domain[i-1] != 'com' && domain[i-1] != 'lk')
      //           return false
      //         else {
      //           return (prefix[0] == '' || domain[0] == '') ? false : true
      //         }
      //       }
      //     }
      //   }
      // },
      // fname_validation() {
      //   if (this.form.fname === '')
      //     return true
      //   else {
      //     var letters = /^[a-zA-Z]+$/
      //     return (!this.form.fname.match(letters) || this.form.fname.length > 20) ? false : true
      //   }        
      // },

      // lname_validation() {
      //   if (this.form.lname === '')
      //     return true
      //   else {
      //     var letters = /^[a-zA-Z]+$/
      //     return (!this.form.lname.match(letters) || this.form.lname.length > 30) ? false : true  
      //   }  
      // },

      // nic_validation() {
      //   if (this.form.nic == '')
      //     return true
      //   else {
      //     var letters = /^[0-9]+$/
      //     return (!this.form.nic.match(letters) || this.form.nic.length > 11 || this.form.nic.length < 9) ? false : true
      //   }        
      // },

      // password_validation() {
      //   if (this.form.password == '')
      //     return true
      //   else {
      //     var letters = /^[0-9a-zA-Z]+$/
      //     return (!this.form.password.match(letters) || this.form.password.length > 20 || this.form.password.length < 6) ? false : true
      //   }
      // },

      // con_password_validation() {
      //   return (this.form.password === this.confirm_password) ? true : false
      // },

      // license_validation() {
      //   return (this.agreeability==='set') ? true : false
      // },

      // validate() {
      //   return (this.email_validation && this.fname_validation && this.lname_validation && this.password_validation && this.nic_validation && this.con_password_validation && this.license_validation) ? false : true
      // }

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
              alert(`Error: ${err.response.data.errors.message}`)
              // this.$notifier.showMessage({ content: `Error: ${err.response.data.errors.message}`, color: 'error' })
          // conflict
            else {
              // console.log(err.response.data.Error)
              alert(`Error: ${err.response.data.Error}`)
              // this.$notifier.showMessage({ content: `Error: ${err.response.data.Error}`, color: 'error' })
            }
          })
      },
      onReset(evt) {
        evt.preventDefault()
          this.form.email = ''
          this.form.fname = ''
          this.form.lname = ''
          this.form.password = ''
          this.form.nic = ''
          this.confirm_password= ''
          // this.agreeability = null
      }
    },
    // middleware: 'guest'
  }
</script>