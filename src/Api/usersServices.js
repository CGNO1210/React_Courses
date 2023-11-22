import api from './api';

export const loginApi = async (email, password) => {
    let token = await api.post('login', {
        email,
        password
    }).then(result => {
        return result.data
    })
        .catch(error => {
            console.log(error)
        })
    return token
}

export const signUpApi = async (firstName, lastName, email, password) => {
    let data = await api.post('createNewUser', {
        email,
        password,
        firstName,
        lastName
    }).then(result => {
        return result.data
    })
        .catch(error => {
            console.log(error)
        })
    return data
}
