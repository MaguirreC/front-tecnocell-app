<script setup>

import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import  {Delete,Edit} from "@element-plus/icons-vue"
import Formulario from '../../components/Formulario.vue';
import { onMounted, ref } from 'vue';
import FormCiudad from './components/FormCiudad.vue';
import { ElMessage,ElMessageBox } from 'element-plus'
import axios from 'axios'
const mostrarFormulario = ref(false)
const formRef=ref()
const departamentos=ref([])
const editandoFormulario=ref(false)
const ciudades = ref([])
const dataCargosById = ref()




const abrirFormulario =()=>{
    mostrarFormulario.value=true
    editandoFormulario.value=false
  
  }


  const guardarDatos = async()=>{
    
  const validacion = await formRef.value.validarFormulario()
  if(validacion){
    await crearCiudad()
  }
}
const crearCiudad= async()=>{
const url ='http://127.0.0.1:8000/api/ciudades/save'

const dataFormulario ={
  nombre: formRef.value.formulario.nombre,
  id_departamento: formRef.value.formulario.departamento,
  

}
try {
        axios.post(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'la ciudad se creo con exito    .',
                    type: 'success',
                })
                getCiudades()
                mostrarFormulario.value = false
                
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear cargo ', error)
    }
}
const getDepartamentos = async () => {
console.log('trayendo departamentos')
const url = 'http://127.0.0.1:8000/api/departamentos/datos'

try {
    axios.get(url)
        .then(function (response) {
            departamentos.value = response.data.datos
            console.log('Departamentos:', departamentos.value)

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error al obtener departamentos ', error)
}

}
const getCiudades= async () => {
console.log('tayendo ciudades')
const url = 'http://127.0.0.1:8000/api/ciudades/datos'

try {
    axios.get(url)
        .then(function (response) {
            ciudades.value = response.data.data
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error al obtener ciudades ', error)
}

}
const eliminarRegistro = async (id)=>{
  const url = 'http://127.0.0.1:8000/api/ciudades/delete'

 
    ElMessageBox.confirm(
        'Esta seguro de eliminar la ciudad',
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
                      getCiudades()

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            } catch (error) {
                console.error('error crear ciudad ', error)
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

const editarFormulario = async(id)=>{
    dataCargosById.value = await datosById(id)
    mostrarFormulario.value=true
    editandoFormulario.value=true
  }
  const datosById = async (id) => {

const url = 'http://127.0.0.1:8000/api/ciudades/datosById'

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
        await actualizarCiudad()
    }
}
const actualizarCiudad = async () => {

 
const url = 'http://127.0.0.1:8000/api/ciudades/update'

const dataFormulario = {

    id:dataCargosById.value[0].id,
    nombre: formRef.value.formulario.nombre,
    id_departamento: formRef.value.formulario.departamento
}
try {
    axios.put(url, dataFormulario)
        .then(function (response) {
            console.log(response);
            formRef.value?.limpiarFormulario()
            ElMessage({
                message: 'la ciudad se actualizo con exito    .',
                type: 'success',
            })
            getCiudades()
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
   getDepartamentos()
   getCiudades()
    
})




</script>

<template>
   <LayoutMain>
        <template #slotLayout>
            <Header
            :titulo="'ciudades'"
            :tituloBoton="'Crear ciudad'"
            :abrir="abrirFormulario"
            ></Header>
          

            <Formulario
            :titulo="'ciudad'" v-model:is-open="mostrarFormulario":is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos">
                <template #slotForm>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <FormCiudad
                    v-model:is-open="mostrarFormulario" ref="formRef" :departamentos="departamentos" :dataValue="dataCargosById"/>
                  </el-col>
                </el-row>
                </template>

            </Formulario>

            <el-table :data="ciudades" stripe style="width: 100%">
            <el-table-column prop="nombre" label="Nombre" width="180" />
            <el-table-column prop="id_departamento" label="Departamento" width="180" />
            <el-table-column fixed="right" label="Acciones" min-width="120">
              <template #default="registro">
                <el-button link type="primary" size="large" @click="editarFormulario(registro.row.id)":icon="Edit" >                  
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