import api from './api';

export const getAllChapters = async () => {
    let data = await api.get('getAllChapters', {
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
    return data.chapters
}

export const createChapter = async (formData) => {
    let data = await api.post('createChapter', {
        name: formData.name,
        idCourse: formData.idCourse
    }, {
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
export const updateChapter = async (formData) => {
    let data = await api.put('editChapter', {
        name: formData.name,
        idCourse: formData.idCourse,
        id: formData.id
    }, {
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

export const deleteChapter = async (id) => {
    let data = await api.delete('deleteChapter', {
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

