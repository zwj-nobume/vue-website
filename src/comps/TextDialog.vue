<script setup>
import { ref } from 'vue';

const textRef = ref('')
const isCodeRef = ref(false)
const dialogRef = ref(null)
const showModal = (text, isCode = false) => {
    textRef.value = text
    isCodeRef.value = isCode
    dialogRef.value.showModal()
}

defineExpose({
    showModal,
})
</script>

<template>
    <dialog ref="dialogRef">
        <button class="close" @click="dialogRef.close()"><img src="/src/assets/icon/close.svg" width="20"
                height="20"></button>
        <pre v-if="isCodeRef">{{ JSON.parse(textRef) }}</pre>
        <text v-if="!isCodeRef">{{ textRef }}</text>
    </dialog>
</template>

<style scoped>
dialog {
    width: 80%;
    height: 60%;
    position: relative;
    scrollbar-width: none;
    background-color: rgba(255, 240, 245, 0.95);
}

dialog>button.close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background: transparent;
}

dialog>button.close {
    cursor: pointer;
}

dialog>pre,
dialog>text {
    white-space: pre-wrap;
}
</style>