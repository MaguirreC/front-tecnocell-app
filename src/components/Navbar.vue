<!-- src/components/Navbar.vue -->
<template>
    <el-menu
    :default-active="activeIndex"
        background-color="#008080"
        text-color="#fff"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0" class="logo">
        <img
        src="../../images/LOGO-INMOBILIARIA-001.jpg"
          style="width: 50px"
          alt="Element logo"

        />
      </el-menu-item>
      <el-sub-menu ind  ex="1">
        <template #title>Usuario</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const activeIndex = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>
  
  <style scoped>
 .el-menu-demo{
    top: 0;
    width: 100%;
    z-index: 10;
 }

 .el-menu-item, 
span.el-avatar.el-avatar--circle {
  margin-right: auto;
  padding: 0;
}

.logo{

  mix-blend-mode:color-burn
  ;
}
  
  </style>
