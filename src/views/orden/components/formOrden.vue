<template>
    <el-form
      ref="formRef"
      style="max-width: 80%"
      :model="formulario"
      :rules="rules"
      label-width="auto"
      status-icon
    >
    <el-form-item label="cliente" prop="cliente">
        <el-select v-model="formulario.cliente" placeholder="selecciona el cliente">
        <el-option v-for="cliente in props.clientes"
          :key="cliente.id"
          :label="cliente.nombre"
          :value="cliente.id"/>
 
      </el-select>
      </el-form-item>
      <el-form-item label="Descripcion" prop="descripcion">
      <el-input v-model="formulario.descripcion" />
    </el-form-item>
    <el-form-item label="tecnico" prop="tecnico">
        <el-select v-model="formulario.tecnico" placeholder="selecciona eñ tecnico">
        <el-option v-for="tecnico in props.tecnicos"
          :key="tecnico.id"
          :label="tecnico.nombre"
          :value="tecnico.id"/>
 
      </el-select>
      </el-form-item>
      <el-form-item label="dispositivo" prop="dispositivo">
        <el-select v-model="formulario.dispositivo" placeholder="selecciona el dispositivo">
        <el-option v-for="dispositivo in props.dispositivos"
          :key="dispositivo.id"
          :label="dispositivo.tipo"
          :value="dispositivo.id"/>
 
      </el-select>
      </el-form-item>
      <el-form-item label="Fecha" prop="fecha">
        <el-input v-model="formulario.fecha" />
      </el-form-item>
      
      
    </el-form>
  </template>
  
  <script  setup>
  import { reactive, ref ,watch} from 'vue'
  

  
  
  
  
  const props = defineProps({
    clientes: {
    type:Array,
    required:true
  },
  tecnicos: {
    type:Array,
    required:true
  },
  dispositivos: {
    type:Array,
    required:true
  },
  dataValue: Object,
});

 
  const formRef= ref()
  const formulario = reactive({
    cliente: '',
    descripcion: '',
    tecnico: '',
    dispositivo: '',
    fecha: '',
  })
  const datosFormulario = () => {

formulario.cliente = props.dataValue[0].id_cliente;
formulario.descripcion = props.dataValue[0].descripcion;
formulario.tecnico = props.dataValue[0].id_tecnico;
formulario.dispositivo = props.dataValue[0].id_dispositivo;
formulario.fecha = props.dataValue[0].fecha;

}
  

  const rules = reactive({
    cliente: [
      { required: true, message: 'por favor ingresar el nombre', trigger: 'blur' },
    ],
    descripcion: [
      { required: true, message: 'por favor ingresar el nombre', trigger: 'blur' },
    ],
    tecnico: [
      { required: true, message: 'por favor ingresar el numero telefonico', trigger: 'blur' },
    ],
    dispositivo: [
      { required: true, message: 'por favor ingresar el correo', trigger: 'blur' },
    ],
    fecha: [
      { required: true, message: 'por favor ingresar el cedula', trigger: 'blur' },
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