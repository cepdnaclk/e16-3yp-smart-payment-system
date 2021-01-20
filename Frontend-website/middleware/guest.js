export default function ({$auth,redirect}) {

	if ($auth.loggedIn) {
		this.$notifier.showMessage({ content: `User ${this.$auth.user.name} is already logged in`, color: 'info' })
		// return redirect('/user')
			return redirect('/admin/key')
		// sould route to the current page .that is yet to implement
	}
}