export const state = () => ({
	token: null,
	user: {
		name:'',
		email:'',
		mobile:'',
		role:'user'
  	},
})

export const mutations = {
	SET_DATA(state , payload) {
	  	state.token=payload.token;
	  	state.user.name=payload.name;
	  	state.user.email=payload.email;
	  	state.user.mobile=payload.mobile;
	  	state.user.role=payload.role;
	},
	// SET_TOAST(state , vm) {
	// 	vm.$bvToast.toast(err.response.data.message, {
	// 		          autoHideDelay: 5000,
	// 		          variant: 'danger',
	// 		          toaster: 'b-toaster-top-center',
	// 		          title: 'Login Failed',
	// 		          appendToast: false
	// 		        })
	// }
}