<script setup>
import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';
import  {Delete,Edit} from "@element-plus/icons-vue"
import Formulario from '../../components/Formulario.vue';
import FormCargo from './components/FormCargo.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios'
import { ElMessage } from 'element-plus'

const mostrarFormulario = ref(false)
const editandoFormulario=ref(false)
const formRef=ref()
const cargos = ref([])

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
    name: 'andres',
  }
]

const guardarDatos = async()=>{
  const validacion = await formRef.value.validarFormulario()
  if(validacion){
    await crearCargo()
  }

}

const crearCargo= async()=>{
const url ='http://127.0.0.1:8000/api/cargos/save'

const dataFormulario ={
  nombre: formRef.value.formulario.nombre
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
                datosCargo()
                mostrarFormulario.value = false
                
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear cargo ', error)
    }
}

const datosCargo = async () => {

  console.log('montado')
const url = 'http://127.0.0.1:8000/api/cargos/datos'

try {
axios.get(url)
    .then(function (response) {
        cargos.value = response.data.results
        console.log(response);

    })
    .catch(function (error) {
        console.log(error);
    });

} catch (error) {
console.error('error crear cargo ', error)
}


}
onMounted(() => {
    datosCargo()
})
</script>

<template>
    <LayoutMain>
        <template #slotLayout>
            <Header
            :titulo="'cargos'"
            :tituloBoton="'Crear cargos'"
            :abrir="abrirFormulario"
            ></Header>
          

            <Formulario
            :titulo="'cargos'" v-model:is-open="mostrarFormulario":is-edit="editandoFormulario" @save="guardarDatos">
                <template #slotForm>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <FormCargo
                    v-model:is-open="mostrarFormulario":is-edit="editandoFormulario"
                    ref="formRef"/>
                  </el-col>
                </el-row>
                </template>

            </Formulario>

            <el-table :data="cargos" stripe style="width: 100%">
            <el-table-column prop="nombre" label="Nombre" width="180" />
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