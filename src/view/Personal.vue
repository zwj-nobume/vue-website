<script setup>
import TitleButton from '@/comps/TitleButton.vue';
import UpdateDialog from '@/comps/UpdateDialog.vue';
import { apiPost } from '@/utils/ajax';
import { logout, relogin } from '@/utils/public';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const origin = store.getters.getTokenPayload()
const form = ref({})
Object.assign(form.value, origin)

const url = ref({
    salt: '/api/user/salt',
    edit: '/api/user/edit',
    editpwd: '/api/user/editpwd',
})
const updateDialog = ref(null)

const update = () => {
    const data = {}
    Object.keys(form.value).forEach(key => {
        if (form.value[key] !== origin[key]) data[key] = form.value[key]
    })
    data.userId = form.value.userId
    const callback = (res) => {
        alert(res.message)
        relogin()
    }
    apiPost(url.value.edit, data, callback)
}

const reset = () => Object.assign(form.value, origin)

const resetSalt = () => {
    if (confirm("重置密钥需要重新登录，确定要重置吗？")) {
        const callback = (res) => {
            alert(res.message)
            relogin()
        }
        apiPost(url.value.salt, null, callback)
    }
}

const editPassword = () => updateDialog.value.showModal(origin, 'editpwd')

const idName = ref('userId')
const buttons = ref(new Array(
    { name: "退出登录", emit: 'logout', icon: '/src/assets/icon/logout.svg' },
    { name: "重置密钥", emit: 'reset-salt', icon: '/src/assets/icon/reset-salt.svg' },
    { name: "修改密码", emit: 'edit-password', icon: '/src/assets/icon/edit-password.svg' },
))
const elems = ref(new Array(
    { name: 'oldPassword', label: "原密码", type: 'password', required: true },
    { name: 'newPassword', label: "新密码", type: 'password', required: true },
    { name: 'chkPassword', label: "确认密码", type: 'password', required: true },
))
</script>

<template>
    <main class="main">
        <TitleButton :list="buttons" @logout="logout" @reset-salt="resetSalt" @edit-password="editPassword">
        </TitleButton>
        <form class="person-form" @submit.prevent="update">
            <label>
                <text>用户名:</text>
                <input type="text" v-model="form.userName">
            </label>
            <label>
                <text>邮&emsp;箱:</text>
                <input type="email" v-model="form.email">
            </label>
            <p class="btn-list">
                <button class="submit" type="submit">提交</button>
                <button class="cancel" type="button" @click.stop="reset">重置</button>
            </p>
        </form>
        <UpdateDialog ref="updateDialog" :url="url" :idName="idName" :elems="elems" @reload-table="relogin">
        </UpdateDialog>
    </main>
</template>

<style scoped>
form.person-form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

form.person-form>label,
form.person-form>p.btn-list {
    width: 80%;
}

form.person-form>label {
    display: flex;
    margin-top: 0.5em;
}

form.person-form>label>text {
    flex: 1;
    text-align: right;
    margin-right: 1em;
}

form.person-form>label>input {
    flex: 3;
}

form.person-form>p.btn-list {
    margin: 0;
    display: flex;
    justify-content: space-between;
}

form.person-form>p.btn-list>button:first-child {
    margin-left: 0;
}

form.person-form>p.btn-list>button {
    flex: 1;
    margin-left: 5px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    margin-top: 15px;
    font-size: 1.2em;
}

form.person-form>p.btn-list>button.submit {
    background-color: orange;
}

form.person-form>p.btn-list>button.cancel {
    background-color: darkcyan;
}

form.person-form>p.btn-list>button:hover {
    filter: brightness(1.4);
    cursor: pointer;
}
</style>