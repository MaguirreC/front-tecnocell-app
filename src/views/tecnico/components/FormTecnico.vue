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
      <el-form-item label="Apellido" prop="apellido">
        <el-input v-model="formulario.apellido" />
      </el-form-item>
      <el-form-item label="Telefono" prop="telefono">
        <el-input v-model="formulario.telefono" />
      </el-form-item>
      <el-form-item label="Correo electronico" prop="correo">
        <el-input v-model="formulario.correo" />
      </el-form-item>
      <el-form-item label="Cargo" prop="cargo">
        <el-select v-model="formulario.cargo" placeholder="Activity zone">
          <el-option v-for="cargo in props.cargos"
          :key="cargo.id"
          :label="cargo.nombre"
          :value="cargo.id"/>
        </el-select>
      </el-form-item>
      
    </el-form>
  </template>
  
  <script  setup>
  import { reactive, ref ,watch} from 'vue'

  
  
  
  
  const props = defineProps({
  cargos: {
    type:Array,
    required:true
  },
  dataValue: Object,
});

 
  const formRef= ref()
  const formulario = reactive({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    cargo: '',
  })
  const datosFormulario = () => {

formulario.nombre = props.dataValue[0].nombre;
formulario.apellido = props.dataValue[0].apellido;
formulario.telefono = props.dataValue[0].telefono;
formulario.correo = props.dataValue[0].correo;
formulario.cargo = props.dataValue[0].id_cargo;

}
  

  const rules = reactive({
    nombre: [
      { required: true, message: 'por favor ingresar el nombre', trigger: 'blur' },
    ],
    apellido: [
      { required: true, message: 'por favor ingresar el nombre', trigger: 'blur' },
    ],
    telefono: [
      { required: true, message: 'por favor ingresar el numero telefonico', trigger: 'blur' },
    ],
    correo: [
      { required: true, message: 'por favor ingresar el correo', trigger: 'blur' },
    ],
    cargo: [
      { required: true, message: 'por favor ingresar el cargo', trigger: 'blur' },
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