import axios from 'axios'
import router from "./../router/routes.js"
import { isTokenExpired } from "./../store/useAuth.js"

const token = localStorage.getItem('token');  // Ejemplo de cómo obtener el token
// "token": token,
const apiClient = axios.create({
    baseURL: 'http://localhost:4040/api/',
    // baseURL: 'https://proyectofinal-kwu7.onrender.com/api/',
    // baseURL: 'https://proyectofinal-wv26.onrender.com/api',
    headers: {
        // 'Content-Type': 'application/json',
        "token": token
    }
});

// Interceptar las respuestas
apiClient.interceptors.response.use(
    (response) => response, // Respuesta exitosa
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token inválido o expirado
            localStorage.removeItem('token'); // Eliminar token
            router.push('/'); // Redirigir al login
        }
        return Promise.reject(error);
    }
);

// Interceptar las solicitudes para verificar el token antes de enviarlas
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        router.push('/'); // Redirigir al login si el token está vencido
        throw new axios.Cancel('Token expired'); // Cancelar la solicitud
    }
    config.headers["token"] = token; // Actualizar el token en los headers
    return config;
});

export default apiClient;
