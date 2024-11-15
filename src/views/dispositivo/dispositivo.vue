<script setup>

import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import  {Delete,Edit} from "@element-plus/icons-vue"
import Formulario from '../../components/Formulario.vue';
import { ref ,onMounted} from 'vue';
import FormDispositivo from './components/FormDispositivo.vue';
import axios from 'axios'
import { ElMessage,ElMessageBox } from 'element-plus'

const editandoFormulario=ref(false)
const mostrarFormulario = ref(false)
const clientes=ref([])
const marcas=ref([])
const dispositivos=ref([])
const formRef=ref()
const dataDispositivosById=ref()


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
    await crearDispositivo()
  }
}
const crearDispositivo= async()=>{
const url ='http://127.0.0.1:8000/api/dispositivos/save'

const dataFormulario ={
  tipo: formRef.value.formulario.tipo,
  capacidad: formRef.value.formulario.capacidad,
  año: formRef.value.formulario.año,
  imei: formRef.value.formulario.imei,
  id_cliente: formRef.value.formulario.cliente,
  id_marca: formRef.value.formulario.marca,
  
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
const getDispositivos= async () => {
console.log('tayendo dispositivos')
const url = 'http://127.0.0.1:8000/api/dispositivos/datos'

try {
    axios.get(url)
        .then(function (response) {
            dispositivos.value = response.data.data
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error al obtener cargo ', error)
}

}
const datosMarcas = async () => {

console.log('montado')
const url = 'http://127.0.0.1:8000/api/marca/datos'

try {
axios.get(url)
  .then(function (response) {
      marcas.value = response.data.data
      console.log(response);

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
onMounted(() => {
    getClientes()
    datosMarcas()
    getDispositivos()
    
})
</script>

<template>
   <LayoutMain>
        <template #slotLayout>
            <Header
            :titulo="'dispositivo'"
            :tituloBoton="'Crear dispositivo'"
            :abrir="abrirFormulario"
            ></Header>
          

            <Formulario
            :titulo="'dispositivo'" v-model:is-open="mostrarFormulario":is-edit="editandoFormulario" @save="guardarDatos"  @update="actualizarDatos">
                <template #slotForm>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <FormDispositivo
                    v-model:is-open="mostrarFormulario":is-edit="editandoFormulario" ref="formRef" :clientes="clientes" :marcas="marcas":dataValue="dataDispositivosById"/>
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