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
      <el-form-item label="descripcion" prop="descripcion">
        <el-input v-model="formulario.descripcion" />
      </el-form-item>
      <el-form-item label="precio" prop="precio">
        <el-input v-model="formulario.precio" />
      </el-form-item>
      <el-form-item label="Marca" prop="marca">
        <el-select v-model="formulario.marca" placeholder="selecciona la marca">
        <el-option v-for="marca in props.marcas"
          :key="marca.id"
          :label="marca.nombre"
          :value="marca.id"/>
 
      </el-select>
      </el-form-item>
      
    </el-form>
  </template>
  
  <script  setup>
  import { reactive, ref ,watch} from 'vue'

  
  
  
  
  const props = defineProps({
  marcas: {
    type:Array,
    required:true
  },
  dataValue: Object,
});

 
  const formRef= ref()
  const formulario = reactive({
    nombre: '',
    descripcion: '',
    precio: '',
    marca: '',
  
  })
  const datosFormulario = () => {

formulario.nombre = props.dataValue[0].nombre;
formulario.descripcion = props.dataValue[0].descripcion;
formulario.precio = props.dataValue[0].precio;
formulario.marca = props.dataValue[0].id_marca;

}
  

  const rules = reactive({
    nombre: [
      { required: true, message: 'por favor ingresar el nombre', trigger: 'blur' },
    ],
    descripcion: [
      { required: true, message: 'por favor ingresar descripcion', trigger: 'blur' },
    ],
    precio: [
      { required: true, message: 'por favor ingresar el precio del repuesto', trigger: 'blur' },
    ],
    marca: [
      { required: true, message: 'por favor ingresar la marca del repuesto', trigger: 'blur' },
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