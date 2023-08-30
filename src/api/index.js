import axios from 'axios';

axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

const getTreeList = () => {
    return axios.get('http://127.0.0.1:8080/getTreeList')
}

const changeContent = (data) => {
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:8080/changeContent',
        params: {
            id: data
        }
    })
}

const SaveNewContent = (data) => {
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:8080/SaveNewContent',
        params: {
            data
        }
    })
}

const insertTree = (newNode) => {
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:8080/insertTree',
        params: { newNode }
    })
}

const DeleteTree = (data) => {
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:8080/DeleteTree',
        params: {
            id: data.id,
        }
    })
}

const newName = (data) => {
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:8080/newName',
        params: {
            name: data.name,
            id: data.id,
        }
    })
}
const changeIsCollect = (data) => {
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:8080/changeIsCollect',
        params: {
            data
        }
    })
}
const searchIsCollect = (data) => {
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:8080/searchIsCollect',
        params: {
            id: data
        }
    })
}

export { getTreeList, changeContent, SaveNewContent, insertTree, DeleteTree, newName, changeIsCollect, searchIsCollect }