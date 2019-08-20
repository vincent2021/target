export const userService = {
    login,
    logout,
    getAll
}

function login(e) {
    e.preventDefault();
    const user = {
        username: this.state.username,
        firstname: this.state.firstname,
        lastname: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confPassword: this.state.confPassword
    };
    axios.post('http://localhost:8000/newuser', { user })
        .then(handleResponse)
        .then(user => {
            if (user) {
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify({ user }));
            });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    export function authHeader() {
        // return authorization header with basic auth credentials
        let user = JSON.parse(localStorage.getItem('user'));

        if (user && user.authdata) {
            return { 'Authorization': 'Basic ' + user.authdata };
        } else {
            return {};
        }
    }