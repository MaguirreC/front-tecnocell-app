<script setup>

import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import  {Delete,Edit} from "@element-plus/icons-vue"
import Formulario from '../../components/Formulario.vue';
import formOrden from '../orden/components/formOrden.vue';
import { ref,onMounted } from 'vue';
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const mostrarFormulario = ref(false)
const formRef=ref()
const editandoFormulario=ref(false)
const ordenes=ref([])
const clientes=ref([])
const tecnicos=ref([])
const dispositivos=ref([])
const dataOrdenById=ref()


const abrirFormulario =()=>{
    mostrarFormulario.value=true
    editandoFormulario.value=false
  
  }
  const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await actualizarOrden()
    }
}
const actualizarOrden = async () => {

 
const url = 'http://127.0.0.1:8000/api/orden/update'

const dataFormulario = {

    id:dataOrdenById.value[0].id,
    id_cliente: formRef.value.formulario.cliente,
    descripcion: formRef.value.formulario.descripcion,
    id_tecnico: formRef.value.formulario.tecnico,
    id_dispositivo: formRef.value.formulario.dispositivo,
    fecha: formRef.value.formulario.fecha
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
            getOrdenes()
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
    dataOrdenById.value = await datosById(id)
    mostrarFormulario.value=true
    editandoFormulario.value=true
  }

  const guardarDatos = async()=>{
  const validacion = await formRef.value.validarFormulario()
  if(validacion){
    await crearOrden()
  }
}
const datosById = async (id) => {

const url = 'http://127.0.0.1:8000/api/orden/datosById'

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
const crearOrden= async()=>{
const url ='http://127.0.0.1:8000/api/orden/save'

const dataFormulario ={
  id_cliente: formRef.value.formulario.cliente,
  descripcion: formRef.value.formulario.descripcion,
  id_tecnico: formRef.value.formulario.tecnico,
  id_dispositivo: formRef.value.formulario.dispositivo,
  fecha: formRef.value.formulario.fecha,
  


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
                getOrdenes()
                mostrarFormulario.value = false
                
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear cargo ', error)
    }
}
const getOrdenes= async () => {
console.log('tayendo ordenes')
const url = 'http://127.0.0.1:8000/api/orden/datos'

try {
    axios.get(url)
        .then(function (response) {
            ordenes.value = response.data.data
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error al obtener cargo ', error)
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
const eliminarRegistro = async (id)=>{
  const url = 'http://127.0.0.1:8000/api/orden/delete'

 
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
                      getOrdenes()

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
  
    getOrdenes()
    getClientes()
    getTecnicos()
    getDispositivos()
    
})
</script>

<template>
   <LayoutMain>
        <template #slotLayout>
            <Header
            :titulo="'orden'"
            :tituloBoton="'Crear orden'"
            :abrir="abrirFormulario"
            ></Header>
          

            <Formulario
            :titulo="'orden'" v-model:is-open="mostrarFormulario":is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos">
                <template #slotForm>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <formOrden
                    v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" :clientes="clientes":tecnicos="tecnicos":dispositivos="dispositivos":dataValue="dataOrdenById"/>
                  </el-col>
                </el-row>
                </template>

            </Formulario>

            <el-table :data="ordenes" stripe style="width: 100%">
            <el-table-column prop="id_cliente" label="cliente" width="180" />
            <el-table-column prop="descripcion" label="Descripcion" width="180" />
            <el-table-column prop="id_tecnico" label="Tecnico" />
            <el-table-column prop="id_dispositivo" label="Dispositivo" />
            <el-table-column prop="fecha" label="fecha" />
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