<template>
    <div class="container">
      <div class="container__header">
        <h2 class="container__title">Modulo de {{ titulo }}</h2>
        <el-button type="primary" @click="abrir" class="padded-button">
          {{ tituloBoton }}
        </el-button>
      </div>
    </div>
  </template>


<script setup>

defineProps({
    titulo: { type: String, required: true },
    tituloBoton: { type: String, required: true },
    abrir: {
      type: Function,
      required: true
    }
  })

</script>


<style scoped>
.container {
  margin-bottom: 10px;
}

.container__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.padded-button {
  padding: 10px 20px;
  background-color: #7f5af0;
  border: none;
  color: white;
}

.container__title {
  margin: 0;
  font-size: 1.5rem;
  white-space: nowrap; 
}

</style>