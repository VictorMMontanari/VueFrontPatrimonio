<script setup>
import ContainerVue from '../components/ContairnerVue.vue';
import LogoSvg from '../assets/LogoSvg.svg';
</script>

<template>
    <ContainerVue> 
        <div style="display: flex;justify-items: center;width: 100%;justify-content: center;">
            <img :src="LogoSvg" alt="Vue" style="width: 50rem;"/> 
        </div>
        <p style="font-size: 2rem;">Controle Patrimonial</p>
    </ContainerVue>
</template>
  
<style scoped>
</style>
  