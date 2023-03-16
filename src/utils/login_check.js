const checkLoggedIn = async (user) => {
    if (!user) {
        navigate('/');
    }
}