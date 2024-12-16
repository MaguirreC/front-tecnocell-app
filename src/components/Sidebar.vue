<template>
    <el-row class="tac">
      <el-col :span="12">
       
        <el-menu
        :default-active="$route.path"
        router
          class="el-menu-vertical-demo"
          background-color="#242629"
          text-color="#fff"
          collapse-transition
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Administrador</span>
            </template>
            
              <el-menu-item index="cargo">cargos</el-menu-item>
              <el-menu-item index="ciudad">Ciudades</el-menu-item>
              <el-menu-item index="cliente">Clientes</el-menu-item>
              <el-menu-item index="departamento">departamentos</el-menu-item>
              <el-menu-item index="dispositivo">dispositivos</el-menu-item>
              <el-menu-item index="marca">marcas</el-menu-item>
              <el-menu-item index="repuesto">repuestos</el-menu-item>
              <el-menu-item index="tecnico">tecnicos</el-menu-item>
              <el-menu-item index="inventario">Inventario</el-menu-item>
              <el-menu-item index="orden">Orden</el-menu-item>
        
            
          </el-sub-menu>
          
        </el-menu>
      </el-col>
      
    </el-row>
  </template>
  
  <script lang="ts" setup>
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>

   <style scoped>
  html, body {
    margin: 0;
    padding: 0;
    /* height: 100%; */
  }
  

  
  .el-menu-vertical-demo {
    width: 250px;
    min-height: 100%;
  }
  </style>