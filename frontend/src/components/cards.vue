   <template>
    <q-card class="my-card">
      <q-img :src="imageSrc" class="card-image">
        <div class="text-subtitle2 absolute-top text-center" style="font-weight: bold; font-size: 15px;">
          {{ title }}
        </div>
      </q-img>
      <q-card-section>
        <q-btn id="btn" color="primary" clickable :to="buttonLink" v-ripple>
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
  

  #Ver {
    width: 55%;
    border-radius: 5px;
  }
  #btn:hover{
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.493);
/* font-weight: bold; */
  }
  </style>