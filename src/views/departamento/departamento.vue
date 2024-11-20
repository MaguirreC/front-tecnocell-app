<script setup>

import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import  {Delete,Edit} from "@element-plus/icons-vue"
import Formulario from '../../components/Formulario.vue';
import { ref ,onMounted} from 'vue';
import FormDepartamentos from './components/FormDepartamentos.vue';
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'


const mostrarFormulario = ref(false)
const editandoFormulario=ref(false)
const formRef=ref()
const departamentos=ref([])
const dataDepartamentoById=ref()

const editarFormulario = async(id)=>{
    dataDepartamentoById.value = await datosById(id)
    mostrarFormulario.value=true
    editandoFormulario.value=true
  }


const abrirFormulario =()=>{
    mostrarFormulario.value=true
    editandoFormulario.value=false
  
  }

  const guardarDatos = async()=>{
  const validacion = await formRef.value.validarFormulario()
  if(validacion){
    await crearDepartamento()
  }

}
const datosById = async (id) => {

const url = 'http://127.0.0.1:8000/api/departamentos/datosById'

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
const crearDepartamento= async()=>{
const url ='http://127.0.0.1:8000/api/departamentos/save'

const dataFormulario ={
  nombre: formRef.value.formulario.nombre
}
try {
        axios.post(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El departamento se creo con exito    .',
                    type: 'success',
                })
                datosDepartamentos()
                mostrarFormulario.value = false
               
                
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear departamento', error)
    }
}

const datosDepartamentos = async () => {

console.log('montado')
const url = 'http://127.0.0.1:8000/api/departamentos/datos'

try {
axios.get(url)
  .then(function (response) {
      departamentos.value = response.data.datos
      console.log(response);

  })
  .catch(function (error) {
      console.log(error);
  });

} catch (error) {
console.error('error crear cargo ', error)
}


}
const eliminarRegistro = async(id)=>{
  const url = 'http://127.0.0.1:8000/api/departamentos/delete'

    ElMessageBox.confirm(
        'Esta seguro de eliminar el departamento ',
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
                        datosDepartamentos()

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            } catch (error) {
                console.error('error crear departamentos ', error)
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
const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await actualizarDepartamento()
    }
}
const actualizarDepartamento = async () => {

 
const url = 'http://127.0.0.1:8000/api/departamentos/update'

const dataFormulario = {

    id:dataDepartamentoById.value[0].id,
    nombre: formRef.value.formulario.nombre,

}
try {
    axios.put(url, dataFormulario)
        .then(function (response) {
            console.log(response);
            formRef.value?.limpiarFormulario()
            ElMessage({
                message: 'el departamento se actualizo con exito    .',
                type: 'success',
            })
           datosDepartamentos()
            mostrarFormulario.value = false

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error actualizar ciudad', error)
}

}
onMounted(() => {
    datosDepartamentos()
})
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
            :titulo="'departamento'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos">
                <template #slotForm>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <FormDepartamentos
                    v-model:is-open="mostrarFormulario" ref="formRef" :dataValue="dataDepartamentoById"/>
                  </el-col>
                </el-row>
                </template>

            </Formulario>

            <el-table :data="departamentos" stripe style="width: 100%">
            <el-table-column prop="nombre" label="Nombre" width="180" />
            <el-table-column fixed="right" label="Acciones" min-width="120">
              <template #default="registro">
                <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.id)" >                  
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