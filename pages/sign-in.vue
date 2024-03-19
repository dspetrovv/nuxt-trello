<template>
  <div>
    <h1 class="login-title">Вход</h1>
    <form class="login" type="POST" @submit.prevent="signin">
      <div class="login__input">
        <input
          v-model="username"
          placeholder="username"
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
          Войти
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

useHead({
  title: 'Вход',
});

const username = ref('');
const password = ref('');

const store = useUserStore();
const router = useRouter();

const signin = async () => {
  const isSuccess = await store.signin({
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