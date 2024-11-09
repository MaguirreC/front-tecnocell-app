<script setup>

import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import  {Delete,Edit} from "@element-plus/icons-vue"
import Formulario from '../../components/Formulario.vue';
import { ref } from 'vue';
import FormDepartamentos from './components/FormDepartamentos.vue';


const mostrarFormulario = ref(false)

const abrirFormulario =()=>{
    mostrarFormulario.value=true
  
  }


const tableData = [
  {
    name: 'andres',
    address: 'No. 189, Grove St, Los Angeles',
    phone: '311555',
  }
]


</script>

<template>
   <LayoutMain>
        <template #slotLayout>
            <Header
            :titulo="'departamentos'"
            :tituloBoton="'Crear departamento'"
            :abrir="abrirFormulario"
            ></Header>
          

            <Formulario
            :titulo="'departamento'" v-model:is-open="mostrarFormulario">
                <template #slotForm>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <FormDepartamentos
                    v-model:is-open="mostrarFormulario"/>
                  </el-col>
                </el-row>
                </template>

            </Formulario>

            <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="name" label="Nombre" width="180" />
            <el-table-column prop="address" label="Direccion" width="180" />
            <el-table-column prop="phone" label="Telefono" />
            <el-table-column fixed="right" label="Acciones" min-width="120">
              <template #default>
                <el-button link type="primary" size="large" :icon="Edit" >                  
                </el-button>
                <el-button link type="danger" :icon="Delete" ></el-button>
              </template>
            </el-table-column>
          </el-table>

        </template>
        
        
    </LayoutMain>

</template>


<style>
</style>