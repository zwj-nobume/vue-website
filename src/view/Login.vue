<script setup>
import { apiPost } from '@/utils/ajax';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { isBlank } from '../utils/public';

const router = useRouter()
const store = useStore()
const form = ref({
	userName: '',
	password: '',
})

const token = store.getters.getToken()
if (!isBlank(token)) {
	alert("您已登录")
	router.push('/')
}
const submit = () => {
	apiPost('/api/user/login', form.value, (res) => {
		store.commit('setToken', res.data)
		router.push('/')
	})
}

const reset = () => {
	form.value.userName = ''
	form.value.password = ''
}
</script>

<template>
	<main class="main">
		<h1 class="super-larger">COLONQ</h1>
		<form class="login-form">
			<label for="userName">
				用户名:
			</label>
			<input id="userName" v-model="form.userName" @keyup.enter="submit" placeholder="请输入用户名" />
			<label for="password">
				密&emsp;码:
			</label>
			<input id="password" v-model="form.password" @keyup.enter="submit" type="password" placeholder="请输入密码" />
			<button class="submit" type="button" @click.stop="submit">提交</button>
			<button class="reset" type="button" @click.stop="reset">重置</button>
		</form>
	</main>
</template>

<style scoped>
main.main {
	display: flex;
	flex-direction: column;
	align-items: center;
}

main.main h1.super-larger {
	font-size: xxx-large;
}

main.main form.login-form {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	font-size: larger;
	width: 60%;
}

form.login-form label,
form.login-form input,
form.login-form button {
	width: 100%;
	padding: 0;
	border: 0;
	border-radius: 8px;
	margin-top: 15px;
	font-size: larger;
}

form.login-form input,
form.login-form button {
	height: 60px;
}

form.login-form input {
	padding-left: 20px;
	width: calc(100% - 20px);
	opacity: 0.8;
}

form.login-form button.submit {
	background-color: orange;
}

form.login-form button.reset {
	background-color: darkcyan;
}

form.login-form button:hover {
	filter: brightness(1.4);
	cursor: pointer;
}
</style>