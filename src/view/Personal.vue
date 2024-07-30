<script setup>
import NavList from '@/comps/NavList.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const pages = ref(new Array())
const form = ref({})
console.log(store.getters.getTokenPayload())
</script>

<template>
    <main class="main">
        <NavList :list="pages"></NavList>
        <form>
        </form>
    </main>
</template>

<style scoped></style>