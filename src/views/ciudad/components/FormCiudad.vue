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
      <el-form-item label="Departamentos" prop="departamento">
        <el-select v-model="formulario.departamento" placeholder="selecciona el departamento">
        <el-option v-for="departamento in departamentos"
          :key="departamento.id"
          :label="departamento.nombre"
          :value="departamento.id" />
   
      </el-select>
      </el-form-item>
    
    </el-form>
  </template>
  
  <script setup>
  import { reactive, ref ,watch} from 'vue'
  
  const props = defineProps({
  departamentos: {
    type:Array,
    required:true
  },
  dataValue: Object,
});
const datosFormulario = () => {

formulario.nombre = props.dataValue[0].nombre;
formulario.departamento = props.dataValue[0].id_departamento;

}
  
  const formRef = ref()
  const formulario = reactive({
    nombre: '',
    departamento:'',
   
  })
  
  
  const rules = reactive({
    nombre: [
      { required: true, message: 'ingresa el nombre del departamento', trigger: 'blur' },
     
    ],
    departamento: [
      { required: true, message: 'por favor ingresar el departamento', trigger: 'blur' },
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
  watch(
  () => props.dataValue,
  (newData) => {
    datosFormulario();
  }
);
  
  defineExpose({formulario,validarFormulario,limpiarFormulario})
  
  </script>