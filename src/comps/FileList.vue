<script setup>
import { apiGet } from '@/utils/ajax';
import { onMounted, ref } from 'vue';

const flist = ref(new Array())
const dlist = ref(new Array())
const selItem = ref(new Set())

const sel = (name) => selItem.value.has(name) ? selItem.value.delete(name) : selItem.value.add(name)
const selAll = () => flist.value.filter(file => !file.hide).forEach(file => selItem.value.add(file.name))
const selResv = () => flist.value.filter(file => !file.hide).forEach(file => sel(file.name))

const prev = () => {
    if (dlist.value.length != 0) {
        dlist.value.pop()
        loadFile()
    }
}

const next = (file) => {
    if (file.dir === true) {
        dlist.value.push(file.name)
        loadFile()
    }
}

const loadFile = () => {
    let path = getCurPath()
    const callback = (res) => {
        flist.value = res.data.sort(sortFile)
        selItem.value.clear()
    }
    apiGet(`/api/file/list/${path}`, callback)
}

const sortFile = (a, b) => {
    // 文件夹在最前面，然后是按文件名排序
    if (a.dir === false && b.dir === true) {
        return 1
    } else if (a.dir === b.dir) {
        if (a.name < b.name) {
            return -1
        } else if (a.name > b.name) {
            return 1
        }
        return 0
    }
    return -1
}

const getCurPath = () => {
    return dlist.value.join('/')
}

const getSelectNames = () => {
    return Array.from(selItem.value)
}

defineExpose({
    selAll,
    selResv,
    loadFile,
    getCurPath,
    getSelectNames,
})

onMounted(loadFile)
</script>

<template>
    <section class="page">
        <ul class="file-box">
            <li class="file" @dblclick.stop="prev()">
                <img width="100" height="60" src="/src/assets/icon/last-menu.svg" alt="上一页面">
                <span class="name">上一页面</span>
            </li>
            <li :class="{ 'file': true, 'selected': selItem.has(file.name) }" v-for="file in flist"
                :data-hide="file.hide" @click.stop="sel(file.name)" @dblclick.stop="next(file)" :title="file.name">
                <img width="100" height="60"
                    :src="file.dir ? '/src/assets/icon/directory.svg' : '/src/assets/icon/file.svg'" :alt="file.name">
                <span class="name">{{ file.name }}</span>
            </li>
        </ul>
    </section>
</template>

<style scoped>
ul.file-box {
    margin: 0.5em 0 0 0;
    padding: 0;
    width: 90%;
    list-style: none;
    display: flex;
}

ul.file-box li.file {
    margin: 1em 0 0 1em;
    padding: 0.5em;
    border-radius: 10px;
    display: flex;
    width: 100px;
    flex-direction: column;
    align-items: center;
}

ul.file-box li.file:hover {
    cursor: pointer;
    /* -webkit-transform: scale(1.1) translateY(-8px); */
    transform: scale(1.1) translateY(-8px);
}

ul.file-box li.file.selected {
    border: 1px solid;
}

ul.file-box li.file[data-hide='true'] {
    display: none;
}

ul.file-box li.file span.name {
    margin-top: 0.5em;
    text-align: center;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
    width: 100%;
}
</style>