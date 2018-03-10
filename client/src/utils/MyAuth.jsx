class Authorize {

    register = (email, password) => {       
        fetch('/users', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            this.setToken(data.tokens[0].token)
        })
    }

    login = (email, password) => {
        fetch('/users/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            this.setToken(data.tokens[0].token)
        })
    }

    authFetch = (url, options) => {
        // performs api calls sending the required authentication headers
        let headers = {
            'Content-Type': 'application/json',
            'x-auth': `${this.getToken()}`
        }
        return fetch(url, {
            headers,
            ...options
        })
        .then(res => {
            return new Promise((resolve, reject) => {
                if (res) {
                    return resolve(res) 
                } else {
                    return reject()
                }
            })
        })
    }

    isLoggedIn = () => {
        const token = this.getToken()
        return !!token
    }

    setToken = (token) => {
        localStorage.setItem('TOKEN', token)
    }

    getToken = () => {
        return localStorage.getItem('TOKEN')
    }

    logout = () => {
        localStorage.removeItem('TOKEN')
    }
}

export default Authorize