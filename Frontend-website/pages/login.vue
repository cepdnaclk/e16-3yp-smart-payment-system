<template>
  <div>
    <b-container fluid>
        <br>
      <b-row class="justify-content-md-center">
        <b-col></b-col>
        <b-col sm="8" md="6" lg="4" class="inner-boarder">
          <div class="regheader">
            <br>
            <br>
            <h2 style="text-align:center">Login Form</h2>
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
          password: '',
        },
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

      password_validation() {
        if (this.form.password == '')
          return true
        else {
          var letters = /^[0-9a-zA-Z]+$/
          return (!this.form.password.match(letters) || this.form.password.length > 20 || this.form.password.length < 6) ? false : true
        }
      },


      validate() {
        return (this.email_validation && this.password_validation) ? false : true
      }

    },
    methods: {
      async onSubmit() {
    // without authentication
       // await this.$axios
       //    .post('login', this.form)
       //    .then((res) => {
       //      console.log(res.data)
       //      // this.$notifier.showMessage({ content: `Welcome ${res.data.name}!`, color: 'success' })
       //      this.$router.push('/')

       //    })
       //    .catch((err) => {
       //    // bad request
       //      if (err.response.status == 400)
       //        console.log(err.response.data.errors.message)
       //        // this.$notifier.showMessage({ content: `Error: ${err.response.data.errors.message}`, color: 'error' })
       //    // conflict
       //      else {
       //        console.log(err.response.data.Error)
       //        // this.$notifier.showMessage({ content: `Error: ${err.response.data.Error}`, color: 'error' })
       //      }
       //    })

      // with authentication
        try {
          await this.$auth.loginWith('local', {
            data: this.form
          })
          // console.log(this.$auth.user)
          this.$notifier.showMessage({ content: `Welcome ${this.$auth.user.name} `, color: 'success' })
           
          // return this.$router.push('/user')
          return this.$router.push('/admin/key')
        } catch (err) {
      
        // bad request
          if (err.response.status == 400)
            // console.log(err.response.data.errors.message)
            this.$notifier.showMessage({ content: `Error: ${err.response.data.errors.message} `, color: 'error' })
        // conflict
          else {
            // console.log(err.response.data.Error)
            this.$notifier.showMessage({ content: `Error: ${err.response.data.Error} `, color: 'error' })
          }

          this.form.email = ''
          this.form.password = ''
        } 
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