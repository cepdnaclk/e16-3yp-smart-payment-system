export default async function ({$auth, redirect}) {
    if($auth.loggedIn) {
        let user = $auth.user

        // Autherization Faild .Admin only route
        if(user.role !== 'admin'){
            return redirect('/')
        }

    } else {
        // User must be logged in first
        return redirect('/login')
    }
}