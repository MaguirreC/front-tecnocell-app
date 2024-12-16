<template>
    <el-form
      ref="formRef"
      style="max-width: 80%"
      :model="formulario"
      :rules="rules"
      label-width="auto"
  
      status-icon
    >
      <el-form-item label="Tipo" prop="tipo">
        <el-input v-model="formulario.tipo" />
      </el-form-item>
      <el-form-item label="Capacidad" prop="capacidad">
        <el-input v-model="formulario.capacidad" />
      </el-form-item>
      <el-form-item label="año" prop="año">
        <el-input v-model="formulario.año" />
      </el-form-item>
      <el-form-item label="imei" prop="imei">
        <el-input v-model="formulario.imei" />
      </el-form-item>
      <el-form-item label="Cliente" prop="cliente">
        <el-select v-model="formulario.cliente" placeholder="selecciona el cliente">
        <el-option v-for="cliente in props.clientes"
          :key="cliente.id"
          :label="cliente.nombre"
          :value="cliente.id" />
      </el-select>
      </el-form-item>
      <el-form-item label="Marca" prop="marca">
        <el-select v-model="formulario.marca" placeholder="selecciona la marca del dispositivo">
        <el-option v-for="marca in props.marcas"
          :key="marca.id"
          :label="marca.nombre"
          :value="marca.id" />
      </el-select>
      </el-form-item>
    
    </el-form>
  </template>
  
  <script  setup>
  import { reactive, ref,watch } from 'vue'
  
  const props = defineProps({
  clientes: {
    type:Array,
    required:true
  },
  marcas: {
    type:Array,
    required:true
  },
  dataValue: Object,
});

  
  const formRef = ref()
  const formulario = reactive({
    tipo: '',
    capacidad:'',
    año:'',
    imei:'',
    cliente:'',
    marca:''
   
  })
  const datosFormulario = () => {

formulario.tipo = props.dataValue[0].tipo;
formulario.capacidad = props.dataValue[0].capacidad;
formulario.año = props.dataValue[0].año;
formulario.imei= props.dataValue[0].imei
formulario.cliente = props.dataValue[0].id_cliente;
formulario.marca = props.dataValue[0].id_marca;

}
  
  
  const rules = reactive({
    tipo: [
      { required: true, message: 'ingresa el tipo de dispositivo', trigger: 'blur' },
     
    ],
    capacidad: [
      { required: true, message: 'ingresa la capacidad', trigger: 'blur' },
     
    ],
    año: [
      { required: true, message: 'ingresa el año de lanzamiento', trigger: 'blur' },
     
    ],
    imei: [
      { required: true, message: 'ingresa el imei', trigger: 'blur' },
     
    ],
    cliente: [
      { required: true, message: 'ingresa el nombre del cliente', trigger: 'blur' },
     
    ],
    marca: [
      { required: true, message: 'ingresa la marca del dispositivo', trigger: 'blur' },
     
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