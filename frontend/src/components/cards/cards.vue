<!-- <template>
    <div class="q-pa-md row items-start q-gutter-md">
  
      <q-card class="my-card">
        <q-card-section class="bg-green">
          <div class="text-h6 text-center">Aprendiz</div>
        </q-card-section>
          <img src="https://sena.edu.co/Style%20Library/alayout/images/logoSena.png">
  
        <q-card-actions vertical>
          <q-btn flat>Ingresar</q-btn>
        </q-card-actions>
      </q-card>
      
      <q-card class="my-card">
        <q-card-section class="bg-green" >
          <div class="text-h6 text-center ">Registro</div>
        </q-card-section>
          <img src="https://sena.edu.co/Style%20Library/alayout/images/logoSena.png">
  
        <q-card-actions vertical>
          <q-btn flat>Ingresar</q-btn>
        </q-card-actions>
      </q-card>
  
      <q-card class="my-card">
        <q-card-section class="bg-green">
          <div class="text-h6 text-center">Modalidad</div>
        </q-card-section>
          <img src="https://sena.edu.co/Style%20Library/alayout/images/logoSena.png">
  
        <q-card-actions vertical>
          <q-btn flat>Ingresar</q-btn>
        </q-card-actions>
      </q-card>
  
      <q-card class="my-card">
        <q-card-section class="bg-green">
          <div class="text-h6 text-center">Asignaciones</div>
        </q-card-section>
          <img src="https://sena.edu.co/Style%20Library/alayout/images/logoSena.png">
  
        <q-card-actions vertical>
          <q-btn flat>Ingresar</q-btn>
        </q-card-actions>
      </q-card>
  
      <q-card class="my-card">
        <q-card-section class="bg-green">
          <div class="text-h6 text-center">Seguimientos</div>
        </q-card-section>
          <img src="https://sena.edu.co/Style%20Library/alayout/images/logoSena.png">
  
        <q-card-actions vertical>
          <q-btn flat>Ingresar</q-btn>
        </q-card-actions>
      </q-card>
  
      <q-card class="my-card">
        <q-card-section class="bg-green">
          <div class="text-h6 text-center">Bitacoras</div>
        </q-card-section>
          <img src="https://sena.edu.co/Style%20Library/alayout/images/logoSena.png">
  
        <q-card-actions vertical>
          <q-btn flat>Ingresar</q-btn>
        </q-card-actions>
      </q-card>
  
      <q-card class="my-card">
        <q-card-section class="bg-green">
          <div class="text-h6 text-center">Log</div>
        </q-card-section>
          <img src="https://sena.edu.co/Style%20Library/alayout/images/logoSena.png">
  
        <q-card-actions vertical>
          <q-btn flat>Ingresar</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </template>
  
  <script>
  export default {
    setup () {
      return {
        lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    }
  }
  </script>
  
  <style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 250px
  </style>
   -->
   <template>
    <q-card class="my-card">
      <q-img :src="imageSrc" class="card-image">
        <div class="text-subtitle2 absolute-top text-center" style="font-weight: bold; font-size: 15px;">
          {{ title }}
        </div>
      </q-img>
      <q-card-section>
        <q-btn id="Ver" color="primary" clickable :to="buttonLink" v-ripple>
          {{ buttonText }}
        </q-btn>
      </q-card-section>
    </q-card>
  </template>
  
  <script setup>
  const props = defineProps({
      imageSrc: {
        type: String,
        required: true
      },
      title: {
        type: String,
        default: 'USUARIOS'
      },
      buttonLink: {
        type: String,
        default: '/usuario'
      },
      buttonText: {
        type: String,
        default: 'Ver'
      }
    })
  </script>
  
  <style scoped>
  
  /* .cards { */
    /* width: 80%;
    margin: 0 auto;
    margin-bottom: 120px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
  } */
  
  #Ver,
  #REGISTRO {
    background-color: #2F7D32 !important;
    font-size: 15px;
    font-weight: bold;
  }
  
  #REGISTRO {
    width: 35%;
  }
  
  #Ver {
    width: 55%;
  }
  </style>