<template>
    <div class="q-pa-md row items-start q-gutter-md col-10 col-xs-10 col-sm-8 col-md-4 col-lg-4 items-center flex q-my-lg wraper" id="wraper">
        <q-card class="login" >
            <q-card-section class="header-section">
                <div class="text-h6 text-white text-center">
                    <img src="/imagenes/simg.png" class="logoSena" alt="">
                </div>
            </q-card-section>
            <div class="form-box login text-center">
                <div class="text-h4"><strong>Login</strong></div>
                <q-form>
                    <q-input class="q-mt-sm" outlined v-model="email" label="Correo Electrónico" lazy-rules
                        :rules="[val => val && val.trim() !== '' || 'Por favor ingresa tu correo electrónico']" />
                    <q-input outlined class="q-mt-md" v-model="password" label="Contraseña"
                        :type="isPwd ? 'password' : 'text'"
                        :rules="[val => val !== null && val.trim() !== '' || 'Por favor ingresa tu contraseña']">
                        <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwd = !isPwd" />
                        </template>
                    </q-input>
                    <div class="remember-forgot q-mt-md">
                        <q-btn class="btn-green" color="primary" type="submit" :loading="isLoading" label="INICIO DE SESIÓN" unelevated
                            :ripple="true" />
                    </div>
                    <q-btn class="btn-white" @click="redirectToRecoveryPage" label="¿Olvidaste tu contraseña?"
                        unelevated :ripple="true" />
                </q-form>
            </div>
        </q-card>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const email = ref('')
const password = ref('')
</script>
<style scoped>

.login{
    width: 500px; height: 600px; 
    margin: auto auto;

}
.wraper{
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    margin: auto auto !important;
    /* align-content: center !important; */
    /* justify-items: center; */
    height: 100vh;
}

.form-box.login.text-center {
    padding: 15px;
}


.text-h6.text-white.text-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn-green {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 40%;
  padding: 1px;
  font-size: 16px;
  text-align: center;
  /* background-color: rgb(11, 115, 2); */
  color: white;
  border: none;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
}


.btn-green:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  /* Sombra al pasar el mouse, sin cambiar el color */
  text-shadow: 0px 0px 10px white;
}

.btn-white {
  width: auto;
  padding: -5px;
  font-size: 16px;
  height: 10px;
  margin-top: 20px;
  background-color: transparent;
  color: rgb(0, 0, 0);
  border: none;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  padding-top: 10px;
}

.btn-white::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 80%;
  height: 2px;
  background-color: green;
  transition: transform 0.6s ease;
  transform: translateX(-50%) scaleX(1);
  text-shadow: 0px 0px 10px rgb(0, 0, 0);
}

.btn-white:hover::after {
  transform: translateX(-50%) scaleX(0);
 box-shadow:none;
 
}
</style>