import axios from 'axios'

const token = localStorage.getItem('token');  // Ejemplo de cómo obtener el token
// "token": token,
const apiClient = axios.create({
    baseURL: 'http://localhost:4040/api/',
    // baseURL: 'https://proyectofinal-kwu7.onrender.com/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

const apiUser = axios.create({
    baseURL: 'http://89.116.49.65:4500/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
