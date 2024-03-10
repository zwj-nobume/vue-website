<script setup>
import { apiPost } from '@/utils/ajax.js';
import { ref } from 'vue';

const props = defineProps({
    url: {
        type: Object,
        required: true,
    },
    elems: {
        type: Array,
        required: true,
    },
})
const emit = defineEmits([
    'reload-table',
])

const form = ref(new Object())
const add = () => {
    let checked = true
    props.elems.forEach(elem => {
        if (elem.required && !form.value[elem.name]) {
            alert(`${elem.label}不能为空`)
            checked = false
        }
    })
    if (!checked) return false
    const callback = (res) => {
        alert(res.message)
        console.log(form.value)
        dialogRef.value.close()
        emit('reload-table')
    }
    apiPost(props.url.add, form.value, callback)
}

const dialogRef = ref(null)
const showModal = () => dialogRef.value.showModal()

defineExpose({
    showModal,
})
</script>

<template>
    <dialog ref="dialogRef">
        <form method="dialog" @submit.prevent="add">
            <p v-for="elem in elems">
                <label>{{ elem.label }}:&emsp;</label>
                <input :name="elem.name" :type="elem.type" v-model="form[elem.name]" />
            </p>
            <p>
                <button type="button" @click="dialogRef.close">取消</button>
                <button type="submit">提交</button>
            </p>
        </form>
    </dialog>
</template>

<style scoped>
dialog {
    border: 1px solid;
    border-radius: 5%;
    font-size: x-large;
}

dialog form p {
    margin-bottom: 0;
    display: flex;
    justify-content: space-between;
}

dialog form p button:first-child {
    margin-left: 0;
}

dialog form p button {
    flex: 1;
    margin-left: 5px;
    border-radius: 5%;
}

dialog form p button:hover {
    cursor: pointer;
}

dialog form p input,
dialog form p button {
    font-size: x-large;
}
</style>