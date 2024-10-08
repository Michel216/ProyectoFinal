import axios from 'axios'

// const token = localStorage.getItem('token');  // Ejemplo de cómo obtener el token
// "x-token": token,
const apiClient = axios.create({
    baseURL: 'http://localhost:4040/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:4040/api/',  // Reemplaza con tu URL base de API
//   timeout: 10000, // tiempo de espera para las solicitudes
//   headers: {
//     'Content-Type': 'application/json'
//     // Agrega más encabezados si es necesario
//   }
// })

// // Puedes agregar interceptores si es necesario
// axiosInstance.interceptors.request.use(
//   config => {
//     // Aquí puedes manipular las solicitudes antes de que se envíen, como agregar tokens de autenticación.
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// export default axiosInstance
