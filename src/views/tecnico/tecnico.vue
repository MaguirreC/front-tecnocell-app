<script setup>

import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import  {Delete,Edit} from "@element-plus/icons-vue"
import Formulario from '../../components/Formulario.vue';
import {ref } from 'vue';
import FormTecnico from './components/FormTecnico.vue';
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue';

const mostrarFormulario = ref(false)
const editandoFormulario=ref(false)
const formRef=ref()
const cargos=ref([])
const abrirFormulario =()=>{
    mostrarFormulario.value=true
    editandoFormulario.value=false
  
  }


  const editarFormulario = async()=>{
    mostrarFormulario.value=true
    editandoFormulario.value=true
  }


const tableData = [
  {
    nombre: 'andres',
    correo: 'No. 189, Grove St, Los Angeles',
    phone: '311555',
  }
]
const guardarDatos = async()=>{
  const validacion = await formRef.value.validarFormulario()
  if(validacion){
    await crearTecnico()
  }
}
const crearTecnico= async()=>{
const url ='http://127.0.0.1:8000/api/tecnico/save'

const dataFormulario ={
  nombre: formRef.value.formulario.nombre,
  apellido: formRef.value.formulario.apellido,
  telefono: formRef.value.formulario.telefono,
  correo: formRef.value.formulario.correo,
  id_cargo: formRef.value.formulario.cargo,
  


}
try {
        axios.post(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El cargo se creo con exito    .',
                    type: 'success',
                })
                datosTecnico()
                mostrarFormulario.value = false
                
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear cargo ', error)
    }
}

const getCargos = async () => {
console.log('tayendo cargos')
const url = 'http://127.0.0.1:8000/api/cargos/datos'

try {
    axios.get(url)
        .then(function (response) {
            cargos.value = response.data
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error al obtener cargo ', error)
}


onMounted(() => {
    getCargos()
    
})
}
</script>

<template>
   <LayoutMain>
        <template #slotLayout>
            <Header
            :titulo="'tecnico'"
            :tituloBoton="'Crear tecnico'"
            :abrir="abrirFormulario"
            ></Header>
          

            <Formulario
            :titulo="'tecnico'" v-model:is-open="mostrarFormulario":is-edit="editandoFormulario" @save="guardarDatos">
                <template #slotForm>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <FormTecnico
                    v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" :cargos="cargos" />
                  </el-col>
                </el-row>
                </template>

            </Formulario>

            <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="nombre" label="Nombre" width="180" />
            <el-table-column prop="apellido" label="Apellido" width="180" />
            <el-table-column prop="telefono" label="Telefono" width="180" />
            <el-table-column prop="correo" label="Correo electronico" width="180" />
            <el-table-column prop="cargo" label="Cargo" width="180" />
            <el-table-column fixed="right" label="Acciones" min-width="120">
              <template #default>
                <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario">                  
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