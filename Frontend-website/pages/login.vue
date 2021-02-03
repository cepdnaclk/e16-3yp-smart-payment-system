<template>
  <card>
    <h5 slot="header" class="title">Login Form</h5>
    <form @submit.prevent="onSubmit" @reset="onReset">
      <div class="col-md-6">
        <div class=row>
          <base-input
            type="email"
            label="Enter Email"
            :required="true"
            placeholder="example@email.com"
            v-model="form.email"
          >
          </base-input>
        </div>
        <div class=row>
          <base-input
            type="password"
            label="Enter Password"
            :required="true"
            placeholder="Your Password"
            v-model="form.password"
          >
          </base-input>
        </div>
          <div class="row">
            <div class="col-md-3">
              <base-button native-type="submit" type="info" class="btn-fill">
                Submit
              </base-button>
            </div>
            <div class="col-md-3">
              <base-button native-type="reset" type="danger" class="btn-fill">
                Reset
              </base-button>
            </div>
          </div>
      </div>
    </form>
  </card>
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

      // password_validation() {
      //   if (this.form.password == '')
      //     return true
      //   else {
      //     var letters = /^[0-9a-zA-Z]+$/
      //     return (!this.form.password.match(letters) || this.form.password.length > 20 || this.form.password.length < 6) ? false : true
      //   }
      // },


      // validate() {
      //   return (this.email_validation && this.password_validation) ? false : true
      // }

    },
    methods: {
      async onSubmit() {

      // with authentication
        try {
          await this.$auth.loginWith('local', {
            data: this.form
          })
          // console.log(this.$auth.user)
          // alert(`Welcome ${this.form.email}`);
          // this.$notifier.showMessage({ content: `Welcome ${this.form.email} `, color: 'success' })
           
          this.$router.push('/')
        } catch (err) {
      
        // bad request
          if (err.response.status == 400)
            // console.log(err.response.data.errors.message)
            alert(`Error: ${err.response.data.errors.message} `)
            // this.$notifier.showMessage({ content: `Error: ${err.response.data.errors.message} `, color: 'error' })
        // conflict
          else {
            // console.log(err.response.data.Error)
            alert(`Error: ${err.response.data.Error} `)
            // this.$notifier.showMessage({ content: `Error: ${err.response.data.Error} `, color: 'error' })
          }

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
    auth: 'guest'
  }
</script>