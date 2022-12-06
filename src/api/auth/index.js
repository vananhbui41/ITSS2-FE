import axiosInstance from ".."

export async function signup({ username, email, password, confirmPassword }) {
    try {
        const res = await axiosInstance.post('/register', {
            name: username,
            email,
            password,
            password_confirmation: confirmPassword
        })
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.data.user))
        return {
            success: true
        }
    } catch (error) {
        return {
            success: false,
            message: error.response.data.message
        }
    }
}

export async function signIn({ email, password }) {
    try {
        const res = await axiosInstance.post('/login', {
            email,
            password,
        })
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.data.user))
        return {
            success: true
        }
    } catch (error) {
        return {
            success: false,
            message: error.response.data.message
        }
    }
}