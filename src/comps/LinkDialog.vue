<script setup>
const props = defineProps({
    url: {
        type: Object,
        required: true
    },
    allData: {  // 所有数据
        type: Array,
        required: true,
    },
    avaiData: { // 已有数据
        type: Set,
        required: true,
    },
})
</script>

<template>
    <ul>
        <li v-for="item in allData" :key="item" :data-name="item.name">{{ item.label }}</li>
        <LinkDialog v-if="item?.children?.length"></LinkDialog>
    </ul>
</template>

<style scoped></style>