<script setup>

import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import  {Delete,Edit} from "@element-plus/icons-vue"
import Formulario from '../../components/Formulario.vue';
import { ref,onMounted } from 'vue';
import FormRepuesto from './components/FormRepuesto.vue';
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'


const mostrarFormulario = ref(false)
const editandoFormulario=ref(false)
const marcas=ref([])
const formRef=ref()
const repuestos=ref([])
const dataRepuestosById=ref()


const abrirFormulario =()=>{
    mostrarFormulario.value=true
    editandoFormulario.value=false
  
  }
  const editarFormulario = async(id)=>{
    dataRepuestosById.value = await datosById(id)
    mostrarFormulario.value=true
    editandoFormulario.value=true
  }

  const guardarDatos = async()=>{
  const validacion = await formRef.value.validarFormulario()
  if(validacion){
    await crearRepuesto()
  }
}
const datosById = async (id) => {

const url = 'http://127.0.0.1:8000/api/repuesto/datosById'

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
const crearRepuesto= async()=>{
const url ='http://127.0.0.1:8000/api/repuesto/save'

const dataFormulario ={
  nombre: formRef.value.formulario.nombre,
  descripcion: formRef.value.formulario.descripcion,
  precio: formRef.value.formulario.precio,
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
              
                mostrarFormulario.value = false
                
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear cargo ', error)
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


const eliminarRegistro = async (id)=>{
  const url = 'http://127.0.0.1:8000/api/repuesto/delete'

 
    ElMessageBox.confirm(
        'Esta seguro de eliminar el repuesto',
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
                      getRepuestos()

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
const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await actualizarRepuesto()
    }
}
const actualizarRepuesto = async () => {

 
const url = 'http://127.0.0.1:8000/api/repuesto/update'

const dataFormulario = {

    id:dataRepuestosById.value[0].id,
    nombre: formRef.value.formulario.nombre,
    descripcion: formRef.value.formulario.descripcion,
    precio: formRef.value.formulario.precio,
    id_marca: formRef.value.formulario.marca,
  
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
            getRepuestos()
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
    datosMarcas()
    getRepuestos()
})
</script>

<template>
   <LayoutMain>
        <template #slotLayout>
            <Header
            :titulo="'repuesto'"
            :tituloBoton="'Crear repuesto'"
            :abrir="abrirFormulario"
            ></Header>
          

            <Formulario
            :titulo="'repuesto'" v-model:is-open="mostrarFormulario":is-edit="editandoFormulario" @save="guardarDatos"  @update="actualizarDatos">
                <template #slotForm>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <FormRepuesto
                    v-model:is-open="mostrarFormulario":is-edit="editandoFormulario"  ref="formRef":marcas="marcas":dataValue="dataRepuestosById"/>
                  </el-col>
                </el-row>
                </template>

            </Formulario>

            <el-table :data="repuestos" stripe style="width: 100%">
            <el-table-column prop="nombre" label="Nombre" width="180" />
            <el-table-column prop="descripcion" label="Descripcion" width="180" />
            <el-table-column prop="precio" label="Telefono" />
            <el-table-column prop="id_marca" label="Marca" />
            <el-table-column fixed="right" label="Acciones" min-width="120">
              <template #default="registro">
                <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.id)" >                  
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