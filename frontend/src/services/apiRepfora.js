import apiRepfora from './../plugins/axiosRepfora.js'; // Importa tu instancia de Axios si está configurada en /plugins
import apiClient from './../plugins/axios.js'; // Importa tu instancia de Axios si está configurada en /plugins

// Función POST Login
export async function postDataLogin(url, data) {
    try {
        const response = await apiRepfora.post(url, data);
        const { token, role } = response.data; // Desestructuramos el token y el rol de la respuesta
        
        const infoLog = await apiClient.post("/logs/addlog", {name:data.email, data:`POST`, information: data, action: data.data})

        localStorage.setItem('token', token); // Guardamos el token
        localStorage.setItem('role', role); // Guardamos el rol

        return response.data;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error en la petición POST de Login:', error);
        throw error;
    }
}

export async function getDataRepfora(url) {
    try {
        const response = await apiRepfora.get(url);
        return response;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error en la petición GET:', error);
        throw error;  // Opcionalmente, puedes manejar el error o lanzarlo
    }
}