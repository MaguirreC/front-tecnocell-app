<script>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';    
export default{
    name:'LayoutMain',
    components: {
        Navbar,
        Sidebar

    }
    
  }
</script>

<template>
   
<div class="common-layout">
    <el-container>
      <el-header><Navbar /></el-header>
      <el-container style="height: 100vh;">
        <el-aside witdh="400px"><Sidebar /></el-aside>
        <el-main>
          <slot name="slotLayout"></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>


</template>


<style scoped>
/* estilos css CSS */

.el-header{
    padding: 0;
}

.el-container{
    display: flex;
}
</style>