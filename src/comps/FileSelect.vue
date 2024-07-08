<script setup>
import FileList from '@/comps/FileList.vue';
import { ref } from 'vue';

const props = defineProps({
    selSingle: {
        type: Boolean,
        required: false,
    },
})

const emit = defineEmits([
    'select'
])

const fileList = ref(null)
const dialogRef = ref(null)

const select = () => {
    emit('select', fileList.value.getCurPath(), fileList.value.getSelectNames())
    dialogRef.value.close()
}
const reloadFile = () => fileList.value.reloadFile()
const showModal = () => {
    fileList.value.loadFile()
    dialogRef.value.showModal()
}

defineExpose({
    reloadFile,
    showModal,
})
</script>

<template>
    <dialog ref="dialogRef">
        <FileList ref="fileList" :autoLoad="false" :selSingle="props.selSingle" :width="80" :height="48"></FileList>
        <p class="btn-list">
            <button class="cancel" type="button" @click.stop="dialogRef.close">取消</button>
            <button class="select" type="button" @click.stop="select">选择</button>
        </p>
    </dialog>
</template>

<style scoped>
dialog {
    width: 80%;
    height: 60%;
    scrollbar-width: thin;
    background-color: rgba(255, 240, 245, 0.95);
}

dialog[open] {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

dialog p {
    margin-bottom: 0;
    display: flex;
    justify-content: space-between;
}

dialog p.btn-list button:first-child {
    margin-left: 0;
}

dialog p.btn-list button {
    flex: 1;
    margin-left: 5px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    margin-top: 15px;
}

dialog p.btn-list button.select {
    background-color: orange;
}

dialog p.btn-list button.cancel {
    background-color: darkcyan;
}

dialog p.btn-list button:hover {
    filter: brightness(1.4);
    cursor: pointer;
}

dialog p.btn-list button {
    font-size: larger;
}
</style>