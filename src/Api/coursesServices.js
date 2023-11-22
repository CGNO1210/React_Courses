import api from './api';

export const getAllCoursesApi = async () => {
    let data = await api.get('getAllCourses', {
        params: {
            id: 'all'
        },
        headers: {
            token: sessionStorage.getItem('token')
        }
    }).then(result => {
        return result.data
    })
        .catch(error => {
            console.log(error)
        })
    if (data.errCode) {
        console.log(data.errMessage)
        return false
    }
    return data.courses
}

export const createCourse = async (formData) => {
    let data = await api.post('createCourse', formData, {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }).then(result => {
        return result.data
    })
        .catch(error => {
            console.log(error)
        })
    return data
}
export const updateCourse = async (formData) => {
    let data = await api.put('editCourse', formData, {
        headers: {
            token: sessionStorage.getItem('token')
        }
    }).then(result => {
        return result.data
    })
        .catch(error => {
            console.log(error)
        })
    console.log(data)
    return data
}

export const deleteCourse = async (id) => {
    let data = await api.delete('deleteCourse', {
        data: {
            id
        },
        headers: {
            token: sessionStorage.getItem('token')
        }
    }).then(result => {
        return result.data
    })
        .catch(error => {
            console.log(error)
        })
    console.log(data)
    return data
}

