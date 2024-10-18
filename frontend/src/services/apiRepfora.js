import apiClient from './../plugins/axiosRepfora.js'; // Importa tu instancia de Axios si está configurada en /plugins


// Función POST Login
export async function postDataLogin(url, data) {
    try {
        const response = await apiRepfora.post(url, data);
        return response.data;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error en la petición POST de Login:', error);
        throw error;
    }
}

export async function getDataRepfora(url) {
    try {
        const response = await apiRepfora.get(url);
        return response.data;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error en la petición GET:', error);
        throw error;  // Opcionalmente, puedes manejar el error o lanzarlo
    }
}