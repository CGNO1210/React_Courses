import api from './api';

export const getAllLessons = async () => {
    let data = await api.get('getAllLessons', {
        params: {
            id: 'all'
        },
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
    return data.lessons
}
export const getLessonById = async (id) => {
    let data = await api.get('getAllLessons', {
        params: {
            id
        },
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
    return data.lessons
}


export const createLesson = async (formData) => {
    let data = await api.post('createLesson', formData, {
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
export const updateLesson = async (formData) => {
    let data = await api.put('editLesson', formData, {
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

export const deleteLesson = async (id) => {
    let data = await api.delete('deleteLesson', {
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