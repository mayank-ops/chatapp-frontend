import axios from 'axios';

const url = 'https://chat-ms-app.herokuapp.com'

const instance = axios.create({
    baseURL: url
})

export default instance