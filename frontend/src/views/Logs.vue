<template>
    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <h1>REPFORA</h1>
        </div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoms2HEy0ELPrZGRr001PN2sh5sq9dU_BWQ&s" alt="Logo SENA" class="logo">
        <h2 class="login-title">LOGIN</h2>
        <div class="container-form">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="rol">Rol</label>
            <select id="rol" v-model="rol" class="input-field">
              <option value="CONSULTOR">APRENDIZ</option>
              <option value="ADMIN">ADMIN</option>
              <option value="ADMIN">INSTRUCTOR</option>
            </select>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" v-model="password" required class="input-field"/>
          </div>
          <Btn :label='"INICIAR SESIÓN"'
          :onClickFunction='ClickFunctionLogin'></Btn>
        </form>
      </div>
      <p>
          <a  @click="forgotPassword" class="forgot-password">Olvidé mi contraseña</a>
        </p>
    </div>
      </div>
    </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  import Btn from '../components/buttons/Button.vue'
  
  const router = useRouter();
  
  const rol = ref('CONSULTOR')
  const password = ref('')
  
  const handleSubmit = () => {
    console.log('Inicio de sesión con rol:', rol.value, 'y contraseña:', password.value)
  }
  
  const forgotPassword = () => {
    router.replace("./forgotpassword")
    console.log('Olvidé mi contraseña')
  }
  
  const ClickFunctionLogin = async () => {
    router.replace("/Home")
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
  
  .login-container p{
    margin-top: 10px !important;
    margin-bottom: 20px !important;
    text-decoration: underline;
  }
  
  .container-form{
    padding: 20px !important;
  }
  
  .login-box {
    width: 40%;
    /* padding: 20px; */
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin: 40% 0;
    height: 96%;
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
  .form-group label{
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