import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/movements'

const getAll = async () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const erase = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const services = { getAll, create, erase }

export default services