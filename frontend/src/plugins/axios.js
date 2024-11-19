import axios from 'axios'

const token = localStorage.getItem('token');  // Ejemplo de cómo obtener el token
// "token": token,
const apiClient = axios.create({
    baseURL: 'http://localhost:4040/api/',
    // baseURL: 'https://proyectofinal-kwu7.onrender.com/api/',
    // baseURL: 'https://proyectofinal-wv26.onrender.com/api/',
    headers: {
        // 'Content-Type': 'application/json',
        "token": token
    }
});



export default apiClient;
