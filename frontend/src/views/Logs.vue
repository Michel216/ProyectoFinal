<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h1>REPFORA</h1>
      </div>
      <img src="https://repforacat.com/images/LOGO-SENA.png" alt="Logo SENA" class="logo">
      <h2 class="login-title">LOGIN</h2>
      <div class="container-form">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="rol">Rol</label>
            <select id="rol" v-model="rol" class="input-field">
              <option value="APRENDIZ">APRENDIZ</option>
              <option value="ADMIN">ADMIN</option>
              <option value="INSTRUCTOR">INSTRUCTOR</option>
            </select>
          </div>

          <div class="form-group" v-if="rol === 'APRENDIZ' || rol === 'INSTRUCTOR' || rol === 'ADMIN'">
            <label for="email">Correo Electrónico</label>
            <input type="email" id="email" v-model="email" required class="input-field" />
          </div>
          <div class="form-group" v-if="rol === 'APRENDIZ'">
            <label for="cedula">Número de Documento</label>
            <input type="text" id="cedula" v-model="cedula" required class="input-field" />
          </div>


          <div class="form-group" v-if="rol === 'ADMIN' || rol === 'INSTRUCTOR'">
            <label for="password">Contraseña</label>
            <input type="password" id="password" v-model="password" required class="input-field" />
          </div>

          <Btn :label='btnLabel' :onClickFunction='ClickFunctionLogin' />
        </form>
      </div>
      <p>
        <a @click="forgotPassword" class="forgot-password">Olvidé mi contraseña</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Btn from '../components/buttons/Button.vue';
import { postDataLogin } from '../services/apiRepfora.js';
import { useAuthStore } from '../store/useAuth.js';

const router = useRouter();
const authStore = useAuthStore();

let btnLabel = "INICIAR SESIÓN"
const rol = ref('');
const email = ref('');
const cedula = ref('');
const password = ref('');

const handleSubmit = async () => {
    console.log('Inicio de sesión con rol:', rol.value, email.value, 'y contraseña:', password.value);
    try {
        let endpoint;

        if (rol.value === 'ADMIN') {
            endpoint = '/users/login';
        } else if (rol.value === 'INSTRUCTOR') {
            endpoint = '/instructors/login';
        } else if (rol.value === 'APRENDIZ') {
            console.error('La ruta para APRENDIZ aún no está implementada.');
            return;
        }

        const data = await postDataLogin(endpoint, {role:rol.value, email: email.value, password: password.value });

        console.log('Datos de inicio de sesión:', data);

        if (!data) {
            console.error('No se recibió respuesta válida del servidor');
            return;
        }

        // Almacena el token y el rol en el store
        authStore.setToken(data.token, rol.value);

        // Redirigir a la página de inicio
        router.replace("/Home");
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
    }
};


const forgotPassword = () => {
  router.replace("./forgotpassword");
  console.log('Olvidé mi contraseña');
}

const ClickFunctionLogin = async () => {
handleSubmit()
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-color: #f0f0f0;
}

.login-container p {
  margin-top: 10px !important;
  margin-bottom: 20px !important;
  text-decoration: underline;
}

.container-form {
  padding: 20px !important;
}

.login-box {
  width: 30%;
  /* padding: 20px; */
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 40% 0;
  height: auto;
}

.login-header {
  background-color: #2F7D32;
  padding: 10px;
  border-radius: 8px 8px 0 0;
}

.login-header h1 {
  color: white;
  font-size: 40px;
  font-weight: bold;
  margin: 0;
}

.logo {
  width: 100px;
  margin: 20px 0;
}

.login-title {
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: bold;
  margin: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: bold !important;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}


.login-button {
  width: 30%;
  padding: 10px;
  background-color: #2F7D32;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #246024;
  font-weight: 600;
}

.forgot-password {
  color: #2F7D32;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
  font-weight: bold !important;
}
</style>