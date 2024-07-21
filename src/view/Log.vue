<script setup>
import TablePage from '@/comps/TablePage.vue';
import TextDialog from '@/comps/TextDialog.vue';
import TitleButton from '@/comps/TitleButton.vue';
import { ref } from 'vue';

const textDialog = ref(null)
const buttons = ref(new Array())

const openParams = (item) => textDialog.value.showModal(item.apiParams)
const openIntro = (item) => textDialog.value.showModal(item.logIntro)
const openData = (item) => textDialog.value.showModal(item.logData)

const url = ref({
    list: '/api/log/page',
})
const idName = ref('logId')
const struct = ref(new Array(
    { name: "日志类型", value: 'logType', sortFlag: 'log_type' },
    { name: "日志简介", value: 'logIntro', sortFlag: 'log_intro' },
    { name: "创建人", value: 'createName', sortFlag: 'create_name' },
    { name: "创建时间", value: 'createTime', sortFlag: 'create_time' },
))
const control = ref(new Array(
    { name: "参数", emit: 'func0' },
    { name: "简介", emit: 'func1' },
    { name: "信息", emit: 'func2' },
))
</script>

<template>
    <main class="main">
        <TitleButton :list="buttons"></TitleButton>
        <TablePage :url="url" :idName="idName" :struct="struct" :control="control" @func0="openParams"
            @func1="openIntro" @func2="openData">
        </TablePage>
        <TextDialog ref="textDialog"></TextDialog>
    </main>
</template>

<style scoped></style>