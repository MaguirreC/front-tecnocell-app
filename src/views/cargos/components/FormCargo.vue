<template>
  <el-form
    ref="formRef"
    style="max-width: 80%"
    :model="formulario"
    :rules="rules"
    label-width="auto"

    status-icon
  >
    <el-form-item label="Nombre" prop="name">
      <el-input v-model="formulario.nombre" />
    </el-form-item>
  
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'



const formRef = ref()
const formulario = reactive({
  nombre: '',
 
})


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

</script>