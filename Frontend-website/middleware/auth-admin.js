export default function ({$auth, redirect}) {
	let user = $auth.user;

	if (user && user.role === "admin") {
		// console.log("admin here middleware")
	} else {
		$notifier.showMessage({ content: `You are not authorized to visit`, color: 'error' })
		return redirect('/')
	}
}