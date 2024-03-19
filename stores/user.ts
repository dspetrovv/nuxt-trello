import { defineStore } from "pinia";

interface IUser {
  username: string;
  access: string;
};

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as IUser,
    loggedIn: false,
    error: '',
  }),
  actions: {
    checkIsLogged() {
      if (localStorage.getItem('userInfo')!) {
        this.loggedIn = true;
        this.user = JSON.parse(localStorage.getItem('user'));
      }
    },
    async signup(
      { username, email, password }:
      { username: string, email: string, password: string }
      ) {
      this.error = '';
      const { data, error } = await useFetch('/users/create', {
        method: 'post',
        params: {
          username,
          email,
          password,
        }
      });
      if (error.value) {
        this.user = {};
        this.error = error.value.data.message;
        this.loggedIn = false;
        return false;
      }
      localStorage.setItem(
        'user',
        JSON.stringify({
          access: data.value.token,
        }),
      );
      this.user = { ...data.value };
      return true;
    },
    async signin(
      { username, password }:
      { username: string, password: string }
    ) {
      this.error = '';
      const { data, error } = await useFetch('/users/token', {
        method: 'post',
        params: {
          username,
          password,
        }
      });
      if (error.value) {
        this.user = {};
        this.error = error.value.data.message;
        this.loggedIn = false;
        return false;
      }
      localStorage.setItem(
        'user',
        JSON.stringify({username}),
      );
      localStorage.setItem(
        'access',
        JSON.stringify({
          access: data.value.access,
        }),
      );
      localStorage.setItem(
        'refresh',
        JSON.stringify({
          refresh: data.value.refresh,
        }),
      );
      this.loggedIn = true;
      this.user = { ...this.user, ...data.value };
      return true;
    },
    async logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('userInfo');
      this.loggedIn = false;
      this.user = null;
    },
    async refresh() {
      const { data, error } = await useInterceptorFetch('/user/token/refresh', {
        method: 'post',
        params: {
          refresh: JSON.parse(localStorage.getItem('refresh'))?.refresh,
        },
      });
      if (error.value) {
        this.user = {};
        this.error = error.value.data.message;
        this.loggedIn = false;
        return false;
      }
      localStorage.setItem(
        'access',
        JSON.stringify({
          access: data.value.access,
        }),
      );
      this.user = { ...this.user, ...data.value };
      return data.value.access;
    },
  },
});