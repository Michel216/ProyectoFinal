// src/store/useAuth.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null);
    const role = ref(localStorage.getItem('role') || null);

    function setToken(newToken, newRole) {
        token.value = newToken;
        role.value = newRole;
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', newRole);
    }

    function getToken() {
        return token.value;
    }
    function getRole() {
        return role.value;
    }
    

    return {
        setToken,
        getToken,
        getRole,
        token,
        role,
    };
});
