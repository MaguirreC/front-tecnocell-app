import {createRouter,createWebHistory} from 'vue-router'

import Ejemplo from '../views/ejemplo.vue'
import Ciudad from '../views/ciudad.vue'
import Departamento from '../views/departamento.vue'
import Cliente from '../views/cliente.vue'
import Dispositivo from '../views/dispositivo.vue'
import Tecnico from '../views/tecnico.vue'
import Cargo from '../views/cargo.vue'
import Marca from '../views/marca.vue'
import Repuesto from '../views/repuesto.vue'


const routes=[
    {
        path:'/ejemplo',
        name:'Ejemplo',
        component:Ejemplo
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