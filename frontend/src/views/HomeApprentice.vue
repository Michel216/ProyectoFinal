<template>
    <div class="container">
        <!-- Primera fila: Datos del Aprendiz e Información Etapas Productivas -->
        <div class="card">
            <h3 class="card-title">
                <font-awesome-icon icon="fa-solid fa-user" class="icon" />
                DATOS DEL APRENDIZ
            </h3>
            <div class="card-content">
                <div class="logo-container">
                    <img id="lsena" src="/sena-colombia-logo-green39a900.png" alt="Logo SENA" class="logo" />
                </div>
                <div class="info">
                    <p><strong>NOMBRE:</strong> </p>
                    <p>{{ aprendiz.nombre || 'h' }}</p>
                    <p><strong>N° DOCUMENTO:</strong></p>
                    <p>{{ aprendiz.documento || 'h' }}</p>
                    <p><strong>FICHA:</strong> </p>
                    <p>{{ aprendiz.ficha || 'h' }}</p>
                    <p><strong>CÓDIGO FICHA:</strong> </p>
                    <p>{{ aprendiz.codigoFicha || 'h' }}</p>
                </div>
            </div>
        </div>

        <div class="card">
            <h3 class="card-title">
                <font-awesome-icon icon="fa-solid fa-info-circle" class="icon" />
                INFORMACIÓN ETAPAS PRODUCTIVAS
            </h3>
            <div class="info">
                <p><strong>MODALIDAD:</strong></p>
                <p> {{ etapaProductiva.modalidad || 'j ' }}</p>

                <p><strong>FECHA INICIO:</strong> </p>
                <p>{{ etapaProductiva.fechaInicio || ' j' }}</p>
                <p><strong>FECHA FIN:</strong> </p>
                <p>{{ etapaProductiva.fechaFin || ' j' }}</p>

                <p><strong>INSTRUCTOR DE SEGUIMIENTO:</strong> </p>
                <p>{{ etapaProductiva.instructor || ' j' }}</p>
                <p><strong>ESTADO ETAPA PRODUCTIVA:</strong> </p>
                <p>{{ etapaProductiva.estado || 'j ' }}</p>
            </div>
        </div>


        <div class="card full-width">
            <!-- Contenedor de Bitácoras y Seguimientos y Certificaciones -->
            <div class="card-content-columns">
                <!-- Columna izquierda: Bitácoras y Seguimientos -->
                <div class="column left-column">
                    <h3 class="column-title">
                        <font-awesome-icon icon="fa-book" class="icon" />
                        BITÁCORAS Y SEGUIMIENTOS
                    </h3>
                    <div>
                        <div class="row">
                            <div class="info">
                                <p><strong>N° BITÁCORAS:</strong></p>
                                <p>{{ bitacoras.numero || '00' }}</p>
                            </div>
                            <div class="info">
                                <p><strong>VER BITÁCORAS:</strong>
                                    <button class="folder-button" @click="goToBitacoras">
                                        <i class="fas fa-folder-open"></i>
                                    </button>
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="info">
                                <p><strong>N° SEGUIMIENTOS:</strong></p>
                                <p>{{ seguimientos.numero || '00' }}</p>
                            </div>
                            <div class="info">
                                <p><strong>VER SEGUIMIENTOS:</strong>
                                    <button class="folder-button" @click="goToSeguimientos">
                                        <i class="fas fa-folder-open"></i>
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>



                <!-- Columna derecha: Certificaciones -->
                <div class="column right-column">
                    <h3 class="column-title">
                        <font-awesome-icon icon="fa-certificate" class="icon" />
                        CERTIFICACIONES
                    </h3>
                    <div>
                        <div class="info">
                            <p><strong>ESTADO:</strong> </p>
                            <p>{{ certificacion.estado || 'h ' }}</p>
                            <p>
                                <strong>VER CERTIFICACIÓN:</strong>
                                <button class="folder-button" @click="goToCertificaciones">
                                    <i class="fas fa-folder-open"></i>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Btn :label="' Historial'" :icon="'history'" :onClickFunction="goToHistory" style="  margin-left: 90%;" />
    </div>

</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useRouter } from 'vue-router';
import Btn from "../components/buttons/Button.vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faInfoCircle, faBook, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { getData } from "../services/apiClient";
import { useAuthStore } from './../store/useAuth.js'
import { formatDate } from "../utils/formatDate";
import { notifyErrorRequest } from "../composables/Notify";

library.add(faUser, faInfoCircle, faBook, faCertificate);
const aprendiz = ref({
    nombre: "",
    documento: "",
    ficha: "",
    codigoFicha: "",
});

const authStore = useAuthStore();
const role = computed(() => authStore.getRole());
const user = computed(() => authStore.getIdApprentice());

const etapaProductiva = ref({
    modalidad: "",
    fechaInicio: "",
    fechaFin: "",
    instructor: "",
    estado: "",
});

const bitacoras = ref({
    numero: "",
    link: "",
});

const seguimientos = ref({
    numero: "",
    link: "",
});

const certificacion = ref({
    estado: "",
    link: "",
});

const router = useRouter();

const goToHistory = () => {
    router.push({ path: '/History' });
};

onBeforeMount(() => {
    bring();
});

async function bring() {
    try {
        let url = await getData(`/register/listregisterbyapprentice/${user.value}`)
        let activeRegisters = url.data.filter(item => item.register.status === 1);

        console.log(activeRegisters);
        
        if (activeRegisters.length <= 0) {
            notifyErrorRequest('No hay registros activos para este aprendiz')
        }

        aprendiz.value.nombre = `${activeRegisters[0].register.apprentice.firstName} ${activeRegisters[0].register.apprentice.lastName}`;
        aprendiz.value.documento = activeRegisters[0].register.apprentice.numDocument
        etapaProductiva.value.modalidad = activeRegisters[0].modality
        etapaProductiva.value.fechaInicio = formatDate(activeRegisters[0].register.startDate) 
        etapaProductiva.value.fechaFin = formatDate(activeRegisters[0].register.endDate) 
    } catch (error) {
        console.log(error);
    }
}

// const goToBitacoras = () => {
//   router.push({ path: '/Binnacles' }); 
// };

// const goToSeguimientos = () => {
//   router.push({ path: '/FollowUp' }); 
// };
// const goToCertificaciones = () => {
//   router.push({ path: '/certification' }); 
// };

</script>


<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;
    padding: 4rem;
}

.card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    flex: 1 1 calc(48%);

}

.full-width {
    flex: 1 1 100%;
    /* Ocupa todo el ancho disponible */

}

.card-content-columns {
    display: flex;
    justify-content: space-between;
    gap: 5rem;
}

.card-content-columns .left-column {
    flex: 1;
}

.card-content-columns .right-column {
    flex: 1;
}

h3 {
    font-size: 1rem;
    color: green;
    margin-bottom: 0.5rem;
}

/* .logo {
    max-width: 80px;
    margin-bottom: 0.5rem;
  } */

.folder-button {
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: #006837; */
    color: green;
    border: none;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    cursor: pointer;
}

.folder-button i {
    font-size: 1rem;
}

.folder-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.card-title {
    font-size: 1.5em;
    font-weight: bold;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    /* margin-bottom: 16px; */
}

.card-title .icon-user {
    margin-right: 8px;
}

.card-content {
    display: flex;
    align-items: center;
}


.logo-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    /* max-width: 300px; */
    height: auto;
}

.info {
    flex: 2;
    padding-left: 16px;
}

.info p {
    margin: 4px 0;
    font-size: 1em;
}

.info strong {
    color: green;

}

.dates {
    display: flex;
    justify-content: space-between;
    gap: 10px;

}

.dates p {
    flex: 1;

    margin: 4px 0;
}

.column-title {
    font-size: 1.5em;
    font-weight: bold;
    color: green;
    margin: 0;
    gap: 8px;

}

.card strong {
    color: green;

}

.row {
    display: flex;
    align-items: center;

    gap: 70px;

}

.row p {
    margin-bottom: 8px;

}

#lsena {
    width: 80%;
    height: 100%;
}
</style>