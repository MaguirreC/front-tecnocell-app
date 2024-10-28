<script setup>
import LayoutMain from '../../components/LayoutMain.vue';
import Header from '../../components/Header.vue';

</script>

<template>
   <LayoutMain>
        <template #slotLayout>
            <Header
            :titulo="'ciuades'"
            :tituloBoton="'Crear ciudad'"></Header>

        </template>
        
    </LayoutMain>


</template>


<style>
</style>