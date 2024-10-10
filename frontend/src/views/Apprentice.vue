<template>
    <div>
      <ApprenticeTable
        :title="'Aprendices'"
        :rows="rows"
        :columns="columns"
        :onClickEdit="handleEdit"
        :onToggleActivate="handleToggleActivate"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import ApprenticeTable from "../components/Table.vue";
  
  const columns = ref([
    {name: "tpdocument", label: "Tipo de Documento", aling: "center", field: "tpdocument"},
    {name: "numDocument", label: "Número de Documento", aling: "center", field: "numDocument"},
    { name: "firstName", label: "Nombre", aling: "center", field: "firstName" },
    { name: "lastName", label: "Apellido", aling: "center", field: "lastName" },
    { name: "phone", label: "Télefono", aling: "center", field: "phone" },
    { name: "email", label: "Correo", aling: "center", field: "email" },
    { name: "fiche", label: "Ficha", aling: "center", field: "fiche" },
    { name: "status", label: "Estado", aling: "center", field: "status" },
  ]);
  const rows = ref([
    {
      tpdocument: "Cédula de Ciudadanía",
      numDocument: "1111111111",
      firstName: "Daniel",
      lastName: "Silva",
      phone: 314785965,
      email: "daniel@gmail.com",
      fiche: 2711689,
      status: 1,
    },
    {
      tpdocument: "Tarjeta de Identidad",
      numDocument: "2222222222",
      firstName: "Michel",
      lastName: "Gómez",
      phone: 312345678,
      email: "michel@gmail.com",
      fiche: 2711690,
      status: 4,
    },
    {
      tpdocument: "Cédula de Extranjería",
      numDocument: "3333333333",
      firstName: "Willian",
      lastName: "Rodríguez",
      phone: 318765432,
      email: "willian@gmail.com",
      fiche: 2711691,
      status: 3,
    },
    {
      tpdocument: "Cédula de Ciudadanía",
      numDocument: "4444444444",
      firstName: "Jinneth",
      lastName: "Moreno",
      phone: 310987654,
      email: "jinneth@gmail.com",
      fiche: 2711692,
      status: 2,
    },
  ]);
  
  const handleEdit = (rows) => {
    console.log("Editando fila:", rows);
    // Lógica para editar la fila
  };
  
  const handleToggleActivate = (rows) => {
    rows.estado = rows.estado === 1 ? 0 : 1;
    console.log("Estado cambiado:", rows);
  };
  </script>
  