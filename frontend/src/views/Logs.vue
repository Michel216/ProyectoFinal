<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h5>ETAPAS PRODUCTIVAS</h5>
      </div>
      <img src="https://repforacat.com/images/LOGO-SENA.png" alt="Logo SENA" class="logo" />
      <h2 class="login-title">LOGIN</h2>
      <div class="q-pa-md">
        <q-form @submit="handleSubmit" class="q-gutter-md">
          <q-select outlined v-model="rol" :options="optionsLogin" emit-value map-options label="Rol" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, ingrese un rol']" >
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-users" />
            </template>
          </q-select>
          <q-input outlined v-model="email" type="email" label="Correo electrónico" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, ingrese un correo electrónico']" >
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-envelope" />
            </template>
          </q-input>
          <q-input outlined v-if="rol === 'APRENDIZ'" v-model="document" label="N° Documento" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, ingrese un número de documento']" >
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-id-card" />
            </template>
          </q-input>
          <q-input outlined v-if="rol === 'ADMIN' || rol === 'INSTRUCTOR'" v-model="password"
            :type="isPwd ? 'password' : 'text'" label="Contraseña" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, ingrese la contraseña']">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-lock" />
            </template>
          </q-input>
          <div align="center">
            <q-btn class="full-width" label="Iniciar sesión" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
      <p>
        <a @click="forgotPassword" class="forgot-password">Olvidé mi contraseña</a>
      </p>
    </div>
  </div>
</template>



<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Notify } from "quasar";
import { postDataLogin } from "../services/apiRepfora.js";
import { postLogin } from "../services/apiClient.js";
import { useAuthStore } from "../store/useAuth.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUsers, faEnvelope, faIdCard, faLock } from '@fortawesome/free-solid-svg-icons';

library.add(faUsers, faEnvelope, faIdCard, faLock)
const router = useRouter();
const authStore = useAuthStore();

let btnLabel = "INICIAR SESIÓN";
const rol = ref("");
const email = ref("");
const cedula = ref("");
const password = ref("");
const isPwd = ref(true);
const isLoading = ref(false);
const optionsLogin = [
  {
    label: "CONSULTOR",
    value: "APRENDIZ",
  },
  {
    label: "INSTRUCTOR",
    value: "INSTRUCTOR",
  },
  {
    label: "ADMIN",
    value: "ADMIN",
  },
];

const handleSubmit = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    Notify.create({
      type: 'negative',
      message: 'Por favor ingresa todos los campos.',
    });
    return;
  }

  if (!rol.value) {
    Notify.create({
      type: 'negative',
      message: 'Por favor selecciona un rol.',
    });
    return;
  }

  console.log(
    "Inicio de sesión con rol:",
    rol.value,
    email.value,
    "y contraseña:", password.value
  );
  isLoading.value = true;

  try {
    let endpoint;
    let data;

    if (rol.value === "ADMIN") {
      data = await postDataLogin("/users/login", {
        role: rol.value,
        email: email.value,
        password: password.value,
      });
    } else if (rol.value === "INSTRUCTOR") {
      data = await postDataLogin("/instructors/login", {
        role: rol.value,
        email: email.value,
        password: password.value,
      });
    }

    if (rol.value === "APRENDIZ") {
      data = await postLogin("/apprentice/loginapprentice", {
        institutionalEmail: email.value,
        numDocument: cedula.value,
      });
      console.log("Datos de inicio de sesión del aprendiz:", data);
    }

    if (!data) {
      Notify.create({
        type: 'negative',
        message: 'No se recibió respuesta válida del servidor.',
      });
      return;
    }

    // Almacena el token y el rol en el store
    authStore.setToken(data.token, rol.value, data.name, data.email);

    // Redirigir a la página de inicio
    router.replace("/Home");

    Notify.create({
      type: 'positive',
      message: 'Inicio de sesión exitoso.',
    });
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    isLoading.value = false;
    Notify.create({
      type: 'negative',
      message: 'Hubo un error al intentar iniciar sesión.',
    });
  }
};

const forgotPassword = () => {
  router.replace("./forgotpassword");
  console.log("Olvidé mi contraseña");
};

const ClickFunctionLogin = async () => {
  handleSubmit();
};
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
  margin-bottom: 10px !important;
  text-decoration: underline;
}

.container-form {
  padding: 10px !important;
}

.login-box {
  width: 40%;

  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 5px 5px -3px #0003, 0 8px 10px 1px #00000024,
    0 3px 14px 2px #0000001f;
  text-align: center;
  height: auto;
}

.login-header {
  background-color: green;
  padding: 20px;
  border-radius: 8px 8px 0 0;
}

.login-header h5 {
  color: white;
  font-weight: bold;
  margin: 0;
}

.logo {
  width: 80px;
}

.login-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold !important;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.login-button {
  width: 40%;
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: green;
  font-weight: 600;
}

.forgot-password {
  color: green;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
  font-weight: bold !important;
}

.full-width {
  transition: box-shadow 0.3s ease;
}

.full-width:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

  text-shadow: 0px 0px 10px white;
}
</style>
