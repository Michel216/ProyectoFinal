<template>
    <div class="home">
        <div class="cards">
          <!-- Renderizamos cada tarjeta de UserCard con v-for -->
          <UserCard
            v-for="(card, index) in cards"
            :key="index"
            :title="card.title"
            :buttonLink="card.buttonLink"
            :buttonText="card.buttonText"
          />
        </div>
    </div>
  </template>
  
  <script setup>
  // Importa el componente UserCard y UseLayout
  import UserCard from '../components/cards.vue'
  
  // Define las tarjetas con datos
  const cards = [
    {
      title: 'Intructor',
      buttonLink: '/instructor',
      buttonText: 'Ver'
    },
    {
      title: 'Aprendices',
      buttonLink: '/apprentice',
      buttonText: 'Ver'
    },
    {
      title: 'Asignación',
      buttonLink: '/assignment',
      buttonText: 'Ver'
    },
    {
      title: 'Seguimiento',
      buttonLink: '/followup',
      buttonText: 'Ver'
    },
    {
      title: 'Bitacoras',
      buttonLink: '/binnacles',
      buttonText: 'Ver'
    },
    {
      title: 'Informes',
      buttonLink: '/binnacles',
      buttonText: 'Ver'
    }
  ]
  </script>
  
  <style scoped>
  .cards { 
     width: 80%;
     margin: 0 auto;
     margin-bottom: 120px;
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Ajuste de columnas automático */
     gap: 15px;
     margin-top: 20px;
     justify-content: center;
     text-align: center;
     align-items: center;
  } 
  </style>
  