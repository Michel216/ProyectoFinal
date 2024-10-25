import apiClient from './../plugins/axios.js'; // Importa tu instancia de Axios si está configurada en /plugins

// Función GET
export async function getData(url) {
    try {
        const response = await apiClient.get(url);
        return response.data;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error en la petición GET:', error);
        throw error;  // Opcionalmente, puedes manejar el error o lanzarlo
    }
}

// Función POST
export async function postData(url, data) {
    try {
        const response = await apiClient.post(url, data);
        return response.data;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error en la petición POST:', error);
        throw error;
    }
}

// Función POST Login
export async function postLogin(url, data) {
    try {
        const response = await apiClient.post(url, data);
        const { token, role } = response.data; // Desestructuramos el token y el rol de la respuesta

        localStorage.setItem('token', token); // Guardamos el token
        localStorage.setItem('role', role); // Guardamos el rol

        return response.data;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error en la petición POST de Login:', error);
        throw error;
    }
}

// Función PUT
export async function putData(url, data) {
    try {
        const response = await apiClient.put(url, data);
        return response.data;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error en la petición PUT:', error);
        throw error;
    }
}