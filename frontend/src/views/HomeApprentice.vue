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
                <div class="dates">
                    <p><strong>FECHA INICIO:</strong> </p>
                    <p>{{ etapaProductiva.fechaInicio || ' j' }}</p>
                    <p><strong>FECHA FIN:</strong> </p>
                    <p>{{ etapaProductiva.fechaFin || ' j' }}</p>
                </div>
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
                                    <button class="folder-button">
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
                                    <button class="folder-button">
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
                                <button class="folder-button">
                                    <i class="fas fa-folder-open"></i>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Btn 
  :label="'HISTORIAL'" 
  :onClickFunction="uploadFile" 
  :loading="loading" 
  icon="history" 
  style="  margin-left: 90%;" 
/>
    </div>
    
</template>

<script setup>
import { ref } from "vue";
import Btn from "../components/buttons/Button.vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faInfoCircle, faBook, faCertificate } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faInfoCircle, faBook, faCertificate);
const aprendiz = ref({
    nombre: "",
    documento: "",
    ficha: "",
    codigoFicha: "",
});

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
</script>


<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;
    padding: 1rem;
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