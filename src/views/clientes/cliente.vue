<script setup>

import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import  {Delete,Edit} from "@element-plus/icons-vue"
import Formulario from '../../components/Formulario.vue';
import FormCliente from './components/FormCliente.vue';
import { ref,onMounted } from 'vue';
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const mostrarFormulario = ref(false)
const formRef=ref()
const editandoFormulario=ref(false)
const clientes=ref([])
const dataClienteById=ref()


const abrirFormulario =()=>{
    mostrarFormulario.value=true
    editandoFormulario.value=false
  
  }
  const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await actualizarCliente()
    }
}
const actualizarCliente = async () => {

 
const url = 'http://127.0.0.1:8000/api/clientes/update'

const dataFormulario = {

    id:dataClienteById.value[0].id,
    nombre: formRef.value.formulario.nombre,
    apellido: formRef.value.formulario.apellido,
    telefono: formRef.value.formulario.telefono,
    correo: formRef.value.formulario.correo,
    cedula: formRef.value.formulario.cedula
}
try {
    axios.put(url, dataFormulario)
        .then(function (response) {
            console.log(response);
            formRef.value?.limpiarFormulario()
            ElMessage({
                message: 'El cliente se actualizo con exito    .',
                type: 'success',
            })
            getClientes()
            mostrarFormulario.value = false

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error creando cliente', error)
}

}
  const editarFormulario = async(id)=>{
    dataClienteById.value = await datosById(id)
    mostrarFormulario.value=true
    editandoFormulario.value=true
  }

  const guardarDatos = async()=>{
  const validacion = await formRef.value.validarFormulario()
  if(validacion){
    await crearCliente()
  }
}
const datosById = async (id) => {

const url = 'http://127.0.0.1:8000/api/clientes/datosById'

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
const crearCliente= async()=>{
const url ='http://127.0.0.1:8000/api/clientes/save'

const dataFormulario ={
  nombre: formRef.value.formulario.nombre,
  apellido: formRef.value.formulario.apellido,
  telefono: formRef.value.formulario.telefono,
  correo: formRef.value.formulario.correo,
  cedula: formRef.value.formulario.cedula,
  


}
try {
        axios.post(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El cliente se creo con exito    .',
                    type: 'success',
                })
                getClientes()
                mostrarFormulario.value = false
                
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear cargo ', error)
    }
}
const getClientes= async () => {
console.log('tayendo clientes')
const url = 'http://127.0.0.1:8000/api/clientes/datos'

try {
    axios.get(url)
        .then(function (response) {
            clientes.value = response.data.data
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error al obtener cargo ', error)
}

}
const eliminarRegistro = async (id)=>{
  const url = 'http://127.0.0.1:8000/api/clientes/delete'

 
    ElMessageBox.confirm(
        'Esta seguro de eliminar el cliente',
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
                      getClientes()

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

onMounted(() => {
  
    getClientes()
    
})
</script>

<template>
   <LayoutMain>
        <template #slotLayout>
            <Header
            :titulo="'clientes'"
            :tituloBoton="'Crear cliente'"
            :abrir="abrirFormulario"
            ></Header>
          

            <Formulario
            :titulo="'cliente'" v-model:is-open="mostrarFormulario":is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos">
                <template #slotForm>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <FormCliente
                    v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" :dataValue="dataClienteById"/>
                  </el-col>
                </el-row>
                </template>

            </Formulario>

            <el-table :data="clientes" stripe style="width: 100%">
            <el-table-column prop="nombre" label="Nombre" width="180" />
            <el-table-column prop="apellido" label="Apellido" width="180" />
            <el-table-column prop="telefono" label="Telefono" />
            <el-table-column prop="correo" label="Correo" />
            <el-table-column prop="cedula" label="Cedula" />
            <el-table-column fixed="right" label="Acciones" min-width="120">
              <template #default="registro">
                <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.id)">                  
                </el-button>
                <el-button link type="danger" :icon="Delete" @click="eliminarRegistro(registro.row.id)" ></el-button>
              </template>
            </el-table-column>
          </el-table>

        </template>
        
        
    </LayoutMain>

</template>


<style>
</style>