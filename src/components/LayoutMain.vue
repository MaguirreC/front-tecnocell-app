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
   
   <el-container style="height: 100vh;">
    <el-header>
      <Navbar />
    </el-header>
    
    <el-container>
      <el-aside width="250px">
        <Sidebar />
      </el-aside>

      <el-main class="main-content">
        <slot name="slotLayout"></slot>
      </el-main>
    </el-container>
  </el-container>
</template>


<style scoped>
.el-header {
  padding: 0;
}

.el-aside {
  background-color: #f4f4f4;
}

.main-content {
  position: relative;
}
</style>