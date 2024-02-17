<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex'
import ItemList from '@/comps/ItemList.vue';

const store = useStore()

const pages = ref(new Array(
    { name: 'View1', path: '/view1' },
    { name: 'View2', path: '/view2' },
    { name: 'View3', path: '/view3' },
    { name: 'View4', path: '/view4' },
    { name: 'View5', path: '/view5' },
))
</script>

<template>
    <ItemList :list="pages"></ItemList>
</template>

<style scoped>
</style>