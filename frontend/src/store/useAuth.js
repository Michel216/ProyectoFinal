// src/store/useAuth.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null);
    const role = ref(localStorage.getItem('role') || null);
    const name = ref(localStorage.getItem('name') || null); // Agregar nombre
    const email = ref(localStorage.getItem('email') || null); // Agregar email

    function setToken(newToken, newRole, newName, newEmail) {
        token.value = newToken;
        role.value = newRole;
        name.value = newName;
        email.value = newEmail;

        localStorage.setItem('token', newToken);
        localStorage.setItem('role', newRole);
        localStorage.setItem('name', newName); // Guardar nombre en localStorage
        localStorage.setItem('email', newEmail); // Guardar email en localStorage
    }

    function getToken() {
        return token.value;
    }
    
    function getRole() {
        return role.value;
    }

    function getName() {
        return name.value;
    }

    function getEmail() {
        return email.value;
    }

    return {
        setToken,
        getToken,
        getRole,
        getName,
        getEmail,
        token,
        role,
        name,
        email
    };
});

export function isTokenExpired(token) {
    if (!token) return true; // Sin token, considerarlo expirado
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar payload
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        return payload.exp < currentTime; // Verificar si el token ha expirado
    } catch (error) {
        return true; // Si hay un error, el token es inválido
    }
}
