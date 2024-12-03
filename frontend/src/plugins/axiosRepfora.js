import axios from 'axios'

const token = localStorage.getItem('token');  

const apiRepfora = axios.create({
    baseURL: import.meta.env.VITE_URL_REPFORA,
    headers: {
        "token": token
    }
});


export default apiRepfora;