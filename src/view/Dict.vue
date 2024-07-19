<script setup>
import PageList from '@/comps/PageList.vue';
import TitleButton from '@/comps/TitleButton.vue';
import { apiDelete, apiGet, apiPost, apiPut } from '@/utils/ajax.js';
import { isBlank, isNull } from '@/utils/public.js';
import { onMounted, ref } from 'vue';

const url = ref({
    list: '/api/dict/page',
    value: '/api/dict/value',
    add: '/api/dict/add',
    edit: '/api/dict/edit',
    delete: '/api/dict/delete',
})
const selItem = ref('')
const valueType = ref('number')
const numberValue = ref(0)
const textValue = ref('')
const arrayValue = ref([])
const objectValue = ref({})
const typeValueMap = new Map()
typeValueMap.set('number', numberValue)
typeValueMap.set('text', textValue)
typeValueMap.set('array', arrayValue)
typeValueMap.set('object', objectValue)

const resetAllValue = () => {
    valueType.value = 'number'
    numberValue.value = 0
    textValue.value = ''
    arrayValue.value.length = 0
    objectValue.value = {}
}

const addDict = () => {
    const key = prompt("请输入字典KEY")
    if (isNull(key)) return
    if (isBlank(key)) {
        alert("KEY不能为空")
        return
    }
    const data = { key }
    const callback = (res) => {
        alert(res.message)
        loadDict()
    }
    apiPut(url.value.add, data, callback)
}

const saveValue = () => {
    if (isBlank(selItem.value)) {
        alert("请选择一个字典KEY, 或创建一个")
        return
    }
    if (valueType.value === 'number' && isBlank(typeValueMap.get(valueType.value).value)) {
        alert("请输入需要保存的数")
        return
    }
    const key = selItem.value
    const value = `${valueType.value}:${JSON.stringify(typeValueMap.get(valueType.value).value)}`
    const data = { key, value }
    const callback = (res) => {
        alert(res.message)
    }
    apiPost(url.value.edit, data, callback)
}

const del = () => {
    if (isBlank(selItem.value)) {
        alert("请选择一个字典KEY")
        return
    }
    if (confirm(`确认要删除选中的 ${selItem.value} 字典吗?`)) {
        const data = [selItem.value]
        const callback = (res) => {
            alert(res.message)
            resetAllValue()
            loadDict()
        }
        apiDelete(url.value.delete, data, callback)
    }
}
const buttons = ref(new Array(
    { name: "添加字典", emit: 'add', icon: '/src/assets/icon/add-dict.svg' },
    { name: "保存值", emit: 'func1', icon: '/src/assets/icon/save-data.svg' },
    { name: "删除", emit: 'del', icon: '/src/assets/icon/delete.svg' },
))

const addArrValKey = () => {
    arrayValue.value.push('')
}

const addObjValKey = () => {
    const objValKey = prompt("请输入字典值对象KEY")
    if (isNull(objValKey)) return
    if (isBlank(objValKey)) {
        alert("值对象KEY不能为空")
        return
    }
    const keySet = new Set(Object.keys(objectValue.value))
    if (keySet.has(objValKey)) {
        alert("值对象已经有此KEY了")
        return
    }
    objectValue.value[objValKey] = ''
}

const removeArrVal = (index) => arrayValue.value.splice(index, 1)
const removeObjVal = (objKey) => delete objectValue.value[objKey]

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
    }
    apiGet(`${url.value.list}?pageNum=${pageNum}&pageSize=${pageSize.value}`, callback)
}

const selKey = (key) => {
    const callback = (res) => {
        selItem.value = key
        if (!isBlank(res.data)) {
            const indexFlag = res.data.indexOf(':')
            const type = res.data.substring(0, indexFlag)
            const value = JSON.parse(res.data.substring(indexFlag + 1))
            const valueRef = typeValueMap.get(type)
            if (!isNull(valueRef)) {
                resetAllValue()
                valueType.value = type
                valueRef.value = value
            }
        } else resetAllValue()
    }
    apiGet(`${url.value.value}?key=${key}`, callback)
}

onMounted(() => loadDict())
</script>

<template>
    <main class="main">
        <TitleButton :list="buttons" @add="addDict" @func1="saveValue" @del="del"></TitleButton>
        <section class="layout">
            <aside>
                <ul class="dict-list">
                    <li v-for="dict in dictList" @click.stop="selKey(dict)" :title="dict">
                        <img :src="selItem === dict ? '/src/assets/icon/dict-open.svg' : '/src/assets/icon/dict.svg'"
                            :alt="dict" width="60" height="60">
                        <span>{{ dict }}</span>
                    </li>
                </ul>
                <p class="page">
                    <PageList ref="page" @load-page="loadDict" :total="total" :size="pageSize"></PageList>
                </p>
            </aside>
            <article>
                <label class="value-type">
                    <text>字典类型:&emsp;</text>
                    <select name="value-type" v-model="valueType">
                        <option value="number">数字</option>
                        <option value="text">字符串</option>
                        <option value="array">数组</option>
                        <option value="object">对象</option>
                    </select>
                </label>
                <input class="only" v-if="valueType === 'number'" type="number" v-model="numberValue"
                    onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))">
                <input class="only" v-if="valueType === 'text'" type="text" v-model="textValue">
                <section class="only" v-if="valueType === 'array'">
                    <label v-for="(_, i) in arrayValue">
                        <img class="remove" @click.stop="removeArrVal(i)" src="/src/assets/icon/minus.svg" width="20"
                            height="20">
                        <input type="text" v-model="arrayValue[i]">
                    </label>
                    <label>
                        <input type="button" @click.stop="addArrValKey" value="添加">
                    </label>
                </section>
                <section class="only" v-if="valueType === 'object'">
                    <label v-for="objKey in Object.keys(objectValue)">
                        <img class="remove" @click.stop="removeObjVal(objKey)" src="/src/assets/icon/minus.svg"
                            width="20" height="20">
                        <text :title="objKey">{{ objKey }}:&emsp;</text>
                        <input type="text" v-model="objectValue[objKey]">
                    </label>
                    <label>
                        <input type="button" @click.stop="addObjValKey" value="添加">
                    </label>
                </section>
            </article>
        </section>
    </main>
</template>

<style scoped>
section.layout {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 3px;
}

aside {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid;
    border-right-color: rgba(0, 0, 0, 0.5);
}

aside ul.dict-list {
    list-style: none;
    font-size: 1.2em;
    margin: 0;
    padding: 0;
    flex: 1;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(5, minmax(0, 1fr));
    gap: 0.5em;
}

aside ul.dict-list li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

aside ul.dict-list li:hover {
    cursor: pointer;
    transform: scale(1.1) translateY(-8px);
}

aside ul.dict-list li img {
    max-width: 100%;
    max-height: calc(100% - 20px);
}

aside ul.dict-list li span {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    text-align: center;
}

aside p.page {
    font-size: 1.3em;
}

article {
    height: 100%;
    border-left: 1px solid black;
    border-left-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
}

article label.value-type {
    width: calc(100% - 6em);
    padding: 0 3em;
    margin-bottom: 1em;
}

article input.only {
    width: calc(100% - 4em);
    padding: 0.5em 2em 0 2em;
    background-color: rgba(0, 0, 0, 0);
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid black;
}

article section.only {
    display: grid;
    row-gap: 0.5em;
    width: calc(100% - 6em);
    padding: 0 3em;
}

article section.only label {
    position: relative;
    display: flex;
    justify-content: space-between;
}

article section.only label img.remove {
    position: absolute;
    top: 5px;
    left: -30px;
    border: 1px solid #f6ad88;
    border-radius: 50%;
}

article section.only label img.remove:hover {
    cursor: pointer;
}

article section.only label text {
    flex: 1;
    text-align: right;
    margin-right: 0.5em;
    border: 1px solid #E1E1E1;
    border-radius: 5px;
    background-color: rgba(255, 240, 245, 0.5);
}

article section.only label input {
    flex: 1;
}
</style>