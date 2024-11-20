import {createRouter,createWebHistory} from 'vue-router'

import Ejemplo from '../views/ejemplo.vue'
import Departamento from '../views/departamento/departamento.vue'
import Cliente from '../views/clientes/cliente.vue'
import Dispositivo from '../views/dispositivo/dispositivo.vue'
import Tecnico from '../views/tecnico/tecnico.vue'
import Cargo from '../views/cargos/cargo.vue'
import Marca from '../views/marca/marca.vue'
import Repuesto from '../views/repuesto/repuesto.vue'
import LayoutMain from '../components/LayoutMain.vue'
import Login from '../components/Login.vue'
import Ciudad from '../views/ciudad/ciudad.vue'


const routes=[
    {
        path:'/ejemplo',
        name:'Ejemplo',
        component:Ejemplo
    },
    {
        path:'/',
        name:'home',
        component:LayoutMain
    },
    {
        path:'/login',
        name:'login',
        component:Login
    },
    {
        path:'/ciudad',
        name:'Ciudad',
        component:Ciudad
    },
    {
        path:'/departamento',
        name:'Departamento',
        component:Departamento
    },
    {
        path:'/dispositivo',
        name:'Dispositivo',
        component:Dispositivo
    },
    {
        path:'/tecnico',
        name:'Tecnico',
        component:Tecnico
    },
    {
        path:'/cargo',
        name:'Cargo',
        component:Cargo
    },
    {
        path:'/marca',
        name:'Marca',
        component:Marca
    },
    {
        path:'/cliente',
        name:'Cliente',
        component:Cliente
    },
    {
        path:'/repuesto',
        name:'Repuesto',
        component:Repuesto
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router;