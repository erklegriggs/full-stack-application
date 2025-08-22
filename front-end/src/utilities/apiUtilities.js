
const login = (user) => {
    return fetch("http://localhost:8080/api/users/login",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then(response => response.json());
}

const signup= (user) => {
    return fetch("http://localhost:8080/api/users/signup",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then(response => response.json());
}

const getUsers = () => {
    return fetch("http://localhost:8080/api/users",
        {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('key')},
        }).then(response => response.json());
}

const getMe = () => {
return fetch("http://localhost:8080/api/users/me",
    {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('key')},
    }).then(response => response.json());
}

const getUserProfile = () => {
    return fetch("http://localhost:8080/api/users/me", {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('key')},
    }).then(response => response.json());
}

export {login, signup, getUsers, getMe, getUserProfile};