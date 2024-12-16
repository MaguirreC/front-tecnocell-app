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
      <el-form-item label="fecha Compra" prop="fecha_compra">
        <el-input v-model="formulario.fecha_compra" />
      </el-form-item>
      <el-form-item label="Fecha Venta" prop="fecha_venta">
        <el-input v-model="formulario.fecha_venta" />
      </el-form-item>
      <el-form-item label="Repuesto" prop="repuesto">
        <el-select v-model="formulario.repuesto" placeholder="selecciona el cliente">
        <el-option v-for="repuesto in props.repuestos"
          :key="repuesto.id"
          :label="repuesto.nombre"
          :value="repuesto.id" />
      </el-select>
      </el-form-item>
    
    </el-form>
  </template>
  
  <script  setup>
  import { reactive, ref,watch } from 'vue'
  
  const props = defineProps({
    repuestos: {
    type:Array,
    required:true
  },
  dataValue: Object,
});

  
  const formRef = ref()
  const formulario = reactive({
    nombre:'',
    fecha_compra:'',
    fecha_venta:'',
    repuesto:'',
    
   
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
    nombre: [
      { required: true, message: 'ingresa el nombre del registro', trigger: 'blur' },
     
    ],
    fecha_compra: [
      { required: true, message: 'ingresa la fecha de la compra', trigger: 'blur' },
     
    ],
    fecha_venta: [
      { required: true, message: 'ingresa la fecha de la venta', trigger: 'blur' },
     
    ],
    repuesto: [
      { required: true, message: 'ingresa el nombre del repuesto', trigger: 'blur' },
     
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