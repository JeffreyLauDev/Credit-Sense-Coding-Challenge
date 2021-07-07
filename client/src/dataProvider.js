const axios = require('axios');
const SERVER_URL =   "http://"+window.location.hostname + ":4001";

// Create instance called instance
const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 3000,
});


const prefix = '/api/';

export default {
    getData: (url, query) => {
        query = query === undefined ? "" : query
        return (
            instance({
                'method': 'GET',
                'url': prefix + url + query,
            })
        )
    },
    createData: (url, data) =>
        instance({
            'method': 'POST',
            'url': prefix + url + '/',
            data
        })
}