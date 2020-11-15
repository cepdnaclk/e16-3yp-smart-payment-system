export default function ({$auth, redirect}) {
	let user = $auth.user;

	if (user && (user.role === "admin" || user.role === "user")) {
		// this.$notifier.showMessage({ content: `aceess granted`, color: 'info' })
	} else {
		this.$notifier.showMessage({ content: `User must logged in first`, color: 'error' })
		return redirect('/login')
	}
}