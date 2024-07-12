<script setup>
import TitleButton from '@/comps/TitleButton.vue';
import PageList from '@/comps/PageList.vue';
import { apiGet, apiPut } from '@/utils/ajax.js';
import { isNull, isBlank } from '@/utils/public.js';
import { ref } from 'vue';

const url = ref({
    list: '/api/dict/page',
    add: '/api/dict/add',
    edit: '/api/dict/edit',
    delete: '/api/dict/delete',
})

const addDict = () => {
    const key = prompt("请输入字典KEY")
    if (isBlank(key)) {
        alert("KEY不能为空")
        return
    }
    const data = {
        key,
    }
    const callback = (res) => {
        alert(res.message)
        loadDict()
    }
    apiPut(url.value.add, data, callback)
}

const addValue = () => console.log('addValue')
const selAll = () => console.log('selAll')
const selResv = () => console.log('selResv')
const del = () => console.log('del')
const buttons = ref(new Array(
    { name: "添加字典", emit: 'add', icon: '/src/assets/icon/add-dict.svg' },
    { name: "添加值", emit: 'func1', icon: '/src/assets/icon/add-data.svg' },
    { name: "全选", emit: 'sel-all', icon: '/src/assets/icon/sel-all.svg' },
    { name: "反选", emit: 'sel-resv', icon: '/src/assets/icon/sel-resv.svg' },
    { name: "删除", emit: 'del', icon: '/src/assets/icon/delete.svg' },
))

const dictList = ref([])
const page = ref(null)
const pageSize = ref(20)
const total = ref(0)

const loadDict = (pageNum) => {
    if (isNull(pageNum)) {
        pageNum = 1
        page.value.cur = 1
    }
    const callback = (res) => {
        dictList.value = res.data
        total.value = res.total
        console.log(res)
    }
    apiGet(`${url.value.list}?pageNum=${pageNum}&pageSize=${pageSize.value}`, callback)
}

loadDict(1)
</script>

<template>
    <main class="main">
        <TitleButton :list="buttons" @add="addDict" @func1="addValue" @sel-all="selAll" @sel-resv="selResv" @del="del">
        </TitleButton>
        <section class="page">
            <aside>
                <ul class="dict-list">
                    <li v-for="dict in dictList">{{ dict }}</li>
                </ul>
                <p class="page">
                    <PageList ref="page" @load-page="loadDict" :total="total" :size="pageSize"></PageList>
                </p>
            </aside>
            <article></article>
        </section>
    </main>
</template>

<style scoped>
section.page {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 50%);
}

aside {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

aside ul.dict-list {
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
    width: 100%;
    display: grid;
    grid-template: repeat(5, 1fr) / repeat(4, 1fr);
}

aside ul.dict-list li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

aside p.page {
    font-size: 1.3em;
}

article {
    height: 100%;
}
</style>