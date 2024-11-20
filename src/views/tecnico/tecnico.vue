<script setup>

import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import  {Delete,Edit} from "@element-plus/icons-vue"
import Formulario from '../../components/Formulario.vue';
import {ref } from 'vue';
import FormTecnico from './components/FormTecnico.vue';
import axios from 'axios'
import { ElMessage,ElMessageBox } from 'element-plus'
import { onMounted } from 'vue';
import { Row } from 'element-plus/es/components/table-v2/src/components/index.mjs';

const mostrarFormulario = ref(false)
const editandoFormulario=ref(false)
const formRef=ref()
const cargos=ref([])
const tecnicos=ref([])
const dataCargosById = ref()


const abrirFormulario =()=>{
    mostrarFormulario.value=true
    editandoFormulario.value=false
  
  }


  const editarFormulario = async(id)=>{
    dataCargosById.value = await datosById(id)
    mostrarFormulario.value=true
    editandoFormulario.value=true
  }



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
                getTecnicos()
                mostrarFormulario.value = false
                
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear cargo ', error)
    }
}
const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await actualizarTecnico()
    }
}
const getCargos = async () => {
console.log('tayendo cargos')
const url = 'http://127.0.0.1:8000/api/cargos/datos'

try {
    axios.get(url)
        .then(function (response) {
            cargos.value = response.data.data
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error al obtener cargo ', error)
}

}
const getTecnicos= async () => {
console.log('tayendo tecnicos')
const url = 'http://127.0.0.1:8000/api/tecnico/datos'

try {
    axios.get(url)
        .then(function (response) {
            tecnicos.value = response.data.data
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error al obtener cargo ', error)
}

}
const datosById = async (id) => {

const url = 'http://127.0.0.1:8000/api/tecnico/datosById'

try {
    const response = axios.get(url, {
        params: {
            id: id
        }
    })
    return (await response).data.data

} catch (error) {
    console.error('error crear cargo ', error)
}

}
const eliminarRegistro = async (id)=>{
  const url = 'http://127.0.0.1:8000/api/tecnico/delete'

 
    ElMessageBox.confirm(
        'Esta seguro de eliminar el tecnico',
        'Eliminar Registro',
        {
            confirmButtonText: 'SI',
            cancelButtonText: 'Cancelar',
            type: 'error',
        }
    )
        .then(() => {

            try {
                axios.delete(url, { data: { id } })
                    .then(function (response) {
                      getTecnicos()

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            } catch (error) {
                console.error('error crear tecnico ', error)
            }
            ElMessage({
                type: 'success',
                message: 'Se elimino correctamente el registro',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Eliminacion cancelada',
            })
        })
}
const actualizarTecnico = async () => {

 
const url = 'http://127.0.0.1:8000/api/tecnico/update'

const dataFormulario = {

    id:dataCargosById.value[0].id,
    nombre: formRef.value.formulario.nombre,
    apellido: formRef.value.formulario.apellido,
    telefono: formRef.value.formulario.telefono,
    correo: formRef.value.formulario.correo,
    id_cargo: formRef.value.formulario.cargo
}
try {
    axios.put(url, dataFormulario)
        .then(function (response) {
            console.log(response);
            formRef.value?.limpiarFormulario()
            ElMessage({
                message: 'El cargo se actualizo con exito    .',
                type: 'success',
            })
            getTecnicos()
            mostrarFormulario.value = false

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error crear cargo ', error)
}

}


onMounted(() => {
    getCargos()
    getTecnicos()
    
})
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
            :titulo="'tecnico'" v-model:is-open="mostrarFormulario":is-edit="editandoFormulario" @save="guardarDatos"  @update="actualizarDatos">
                <template #slotForm>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <FormTecnico
                    v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" :cargos="cargos" :dataValue="dataCargosById" />
                  </el-col>
                </el-row>
                </template>

            </Formulario>

            <el-table :data="tecnicos" stripe style="width: 100%">
            <el-table-column prop="nombre" label="Nombre" width="180" />
            <el-table-column prop="apellido" label="Apellido" width="180" />
            <el-table-column prop="telefono" label="Telefono" width="180" />
            <el-table-column prop="correo" label="Correo electronico" width="180" />
            <el-table-column prop="id_cargo" label="Cargo" width="180" />
            <el-table-column fixed="right" label="Acciones" min-width="120">
              <template #default="registro">
                <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.id)">                  
                </el-button>
                <el-button link type="danger" :icon="Delete" @click="eliminarRegistro(registro.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        
        
    </LayoutMain>

</template>


<style>
</style>