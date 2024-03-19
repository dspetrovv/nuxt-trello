<template>
  <div>
    <h1 class="login-title">Регистрация</h1>
    <form class="login" type="POST" @submit.prevent="signup">
      <div class="login__input">
        <input
          v-model="username"
          placeholder="username"
          required
        >
      </div>

      <div class="login__input">
        <input
          v-model="email"
          placeholder="email"
          type="email"
          required
        >
      </div>

      <div class="login__input">
        <input
          v-model="password"
          placeholder="password"
          type="password"
          required
        >
      </div>
      <div class="login-action">
        <button class="login__button" type="submit">
          Зарегистрироваться
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

useHead({
  title: 'Регистрация',
});

const email = ref('');
const username = ref('');
const password = ref('');

const store = useUserStore();
const router = useRouter();

const signup = async () => {
  const isSuccess = await store.signup({
    email: email.value,
    username: username.value,
    password: password.value,
  });
  if (isSuccess) {
    router.replace('/');
  }
};
</script>

<style lang="scss" scoped>
@use "~/assets/css/login.scss" as *;
</style>