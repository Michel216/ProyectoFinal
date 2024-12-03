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
            :rules="[val => val.trim() && val.length > 0 || 'Por favor, ingrese un rol']">
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-users" />
            </template>
          </q-select>
          <q-input outlined v-model="email" type="email" label="Correo electrónico" lazy-rules
            :rules="[val => val.trim() && val.length > 0 || 'Por favor, ingrese un correo electrónico']">
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-envelope" />
            </template>
          </q-input>

          <!-- N° Documento solo visible para CONSULTOR -->
          <q-input outlined v-if="rol === 'CONSULTOR'" v-model="document" label="N° Documento" lazy-rules
            :rules="[val => val.trim() && val.length > 0 || 'Por favor, ingrese un número de documento']">
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-id-card" />
            </template>
          </q-input>

          <!-- Contraseña solo visible para ADMIN e INSTRUCTOR -->
          <q-input outlined v-if="rol === 'INSTRUCTOR' || rol === 'ADMIN'" v-model="password"
            :type="isPwd ? 'password' : 'text'" label="Contraseña" lazy-rules
            :rules="[val => val.trim() && val.length > 0 || 'Por favor, ingrese la contraseña']">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-lock" />
            </template>
          </q-input>

          <div align="center">
            <q-btn class="full-width" label="Iniciar sesión" type="submit" color="primary" :loading="isLoading"
              :disable="isLoading" />
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
// import { Notify } from "quasar";
import { postDataLogin } from "../services/apiRepfora.js";
import { postLogin } from "../services/apiClient.js";
import { useAuthStore } from "../store/useAuth.js";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUsers, faEnvelope, faIdCard, faLock } from '@fortawesome/free-solid-svg-icons';
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from "../composables/Notify.js";

// Añadiendo iconos de FontAwesome
library.add(faUsers, faEnvelope, faIdCard, faLock);

const router = useRouter();
const authStore = useAuthStore();

const rol = ref("CONSULTOR");
const email = ref("");
const document = ref("");
const password = ref("");
const isPwd = ref(true);
const isLoading = ref(false);

// Opciones de roles
const optionsLogin = [
  {
    label: "CONSULTOR",
    value: "CONSULTOR",
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
  if (!email.value.trim() || (rol.value !== 'CONSULTOR' && !password.value.trim())) {
    notifyWarningRequest('Por favor ingresa todos los campos.')
    return;
  }

  if (!rol.value) {
    notifyErrorRequest('Por favor selecciona un rol.')
    return;
  }

  isLoading.value = true;

  try {
    let data;
    let endpoint;

    if (rol.value === "ADMIN") {
      data = await postDataLogin("/users/login", {
        role: rol.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        data: "Log in de administrador"
      });
    } else if (rol.value === "INSTRUCTOR") {
      data = await postDataLogin("/instructors/login", {
        role: rol.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        data: "Log in de instructor"
      });
    }
    // Manejo de inicio de sesión para CONSULTOR
    else if (rol.value === "CONSULTOR") {
      data = await postLogin("/apprentice/loginapprentice", {
        institutionalEmail: email.value.trim(),
        numDocument: document.value.trim(),
        data: "Log in de aprendiz"
        
      });
    }

    if (!data) {
      notifyErrorRequest('No se recibió respuesta válida del servidor.')
      return;
    }

    // Almacena el token y el rol en el store
    authStore.setToken(data.token, rol.value, data.name, data.email);

    // Redirigir a la página de inicio
    router.replace("/Home");

    if (rol.value === "CONSULTOR") {
      router.replace("/HomeApprentice");
    }
    notifySuccessRequest('Inicio de sesión exitoso.')
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    isLoading.value = false;
    if (rol.value === "ADMIN" || rol.value === "INSTRUCTOR") {
      notifyErrorRequest(error?.response?.data?.msg || "Error desconocido");
    } else {
      notifyErrorRequest(error?.response?.data?.errors?.[0]?.msg || "Error desconocido");

    }
  }
};

const forgotPassword = () => {
  router.replace("/forgotpassword");
};
</script>

<style scoped>
/* Estilos del formulario */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.login-box {
  width: 40%;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 5px 5px -3px #0003, 0 8px 10px 1px #00000024, 0 3px 14px 2px #0000001f;
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