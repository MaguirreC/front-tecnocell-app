<template>
    <el-card class="book-card" :body-style="{ padding: '30px' }">
      <div slot="header" class="clearfix">
        <span class="book-title">Título del Libro</span>
      </div>
      <img src="https://pics.filmaffinity.com/cien_anos_de_soledad-606630216-mmed.jpgdh" class="book-cover" />
      <div class="book-description">
        <p>Descripción breve del contenido del libro...</p>
        <el-button type="primary" @click="abrir" class="padded-button">
        boton
        </el-button>
      </div>
    </el-card>
  </template>
  
  <script>
  export default {
    name: 'BookCard',
  }
  </script>
  
  <style scoped>
  .book-card {
    width: 200px;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 4px 10px rgba(2, 0, 0, 0.1);
  }
  
  .book-title {
    font-size: 18px;
    font-weight: bold;
  }
  
  .book-cover {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .book-description {
    margin-top: 10px;
  }
  </style>