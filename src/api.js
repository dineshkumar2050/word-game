import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.datamuse.com',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api;
