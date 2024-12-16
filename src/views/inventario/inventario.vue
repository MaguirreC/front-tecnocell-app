<script setup>

import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import  {Delete,Edit} from "@element-plus/icons-vue"
import Formulario from '../../components/Formulario.vue';
import { ref ,onMounted} from 'vue';
import FormInventario from './components/FormInventario.vue';
import axios from 'axios'
import { ElMessage,ElMessageBox } from 'element-plus'

const editandoFormulario=ref(false)
const mostrarFormulario = ref(false)
const formRef=ref()
const repuestos=ref([])


const abrirFormulario =()=>{
    mostrarFormulario.value=true
    editandoFormulario.value=false
  
  }


  const editarFormulario = async(id)=>{
    dataDispositivosById.value = await datosById(id)
    mostrarFormulario.value=true
    editandoFormulario.value=true
  }

  const guardarDatos = async()=>{
  const validacion = await formRef.value.validarFormulario()
  if(validacion){
    await crearInventario()
  }
}
const crearInventario= async()=>{
const url ='http://127.0.0.1:8000/api/inventario/save'

const dataFormulario ={
  nombre: formRef.value.formulario.nombre,
  fecha_compra: formRef.value.formulario.fecha_compra,
  fecha_venta: formRef.value.formulario.fecha_venta,
  id_repuesto: formRef.value.formulario.repuesto,
  
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
                
                mostrarFormulario.value = false
                
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear cargo ', error)
    }
}

const eliminarRegistro = async (id)=>{
  const url = 'http://127.0.0.1:8000/api/dispositivos/delete'

 
    ElMessageBox.confirm(
        'Esta seguro de eliminar el dispositivos',
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
                      getDispositivos()

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
const datosById = async (id) => {

const url = 'http://127.0.0.1:8000/api/dispositivos/datosById'

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
const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await actualizarDispositivo()
    }
}
const actualizarDispositivo = async () => {

 
const url = 'http://127.0.0.1:8000/api/dispositivos/update'

const dataFormulario = {

    id:dataDispositivosById.value[0].id,
    tipo: formRef.value.formulario.tipo,
    capacidad: formRef.value.formulario.capacidad,
    año: formRef.value.formulario.año,
    imei: formRef.value.formulario.imei,
    id_marca: formRef.value.formulario.marca,
    id_cliente: formRef.value.formulario.cliente
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
            getDispositivos()
            mostrarFormulario.value = false

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error crear cargo ', error)
}

}
const getRepuestos= async () => {
console.log('tayendo repuestos')
const url = 'http://127.0.0.1:8000/api/repuesto/datos'

try {
    axios.get(url)
        .then(function (response) {
            repuestos.value = response.data.data
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error al obtener cargo ', error)
}

}
onMounted(() => {
    getRepuestos()
    
})
</script>

<template>
   <LayoutMain>
        <template #slotLayout>
            <Header
            :titulo="'inventario'"
            :tituloBoton="'Agregar'"
            :abrir="abrirFormulario"
            ></Header>
          

            <Formulario
            :titulo="'inventario'" v-model:is-open="mostrarFormulario":is-edit="editandoFormulario" @save="guardarDatos"  @update="actualizarDatos">
                <template #slotForm>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <FormInventario
                    v-model:is-open="mostrarFormulario":is-edit="editandoFormulario" ref="formRef":repuestos="repuestos":dataValue="dataDispositivosById"/>
                  </el-col>
                </el-row>
                </template>

            </Formulario>

            <el-table :data="dispositivos" stripe style="width: 100%">
            <el-table-column prop="tipo" label="Tipo" width="180" />
            <el-table-column prop="capacidad" label="Capacidad" width="180" />
            <el-table-column prop="imei" label="imei" width="180" />
            <el-table-column prop="año" label="Año" width="180" />
            <el-table-column prop="id_marca" label="Marca" width="180" />
            <el-table-column prop="id_cliente" label="Cliente" width="180" />
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