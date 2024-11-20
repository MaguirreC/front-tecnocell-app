<template>
  <el-form
    ref="formRef"
    style="max-width: 80%"
    :model="formulario"
    :rules="rules"
    label-width="auto"

    status-icon
  >
    <el-form-item label="Nombre" prop="nombre">
      <el-input v-model="formulario.nombre" />
    </el-form-item>
  
  </el-form>
</template>

<script  setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  dataValue: Object,
});

const formRef = ref()
const formulario = reactive({
  nombre: '',
 
})
const datosFormulario = () => {

formulario.nombre = props.dataValue[0].nombre;


}

const rules = reactive({
  nombre: [
    { required: true, message: 'ingresa el nombre del cargo', trigger: 'blur' },
   
  ],

})

const validarFormulario=()=>{
  return new Promise ((resolve)=>{
        formRef.value?.validate((valid)=>{
            if (valid) {
              resolve(true)            
            } else {
                resolve(false)             
            }
            
        })
        })  
}


const limpiarFormulario =()=>{
    formRef.value.resetFields()    
}

defineExpose({formulario,validarFormulario,limpiarFormulario})

watch(
  () => props.dataValue,
  (newData) => {
    datosFormulario();
  }
);

</script>