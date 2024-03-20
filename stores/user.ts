import { defineStore } from "pinia";
import { MessageType, useCommonStore } from "./common";

interface IUser {
  username: string;
  access: string;
};

interface IMessage {
  message: string;
  type: MessageType
};

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as IUser,
    isLoggedIn: false,
  }),
  actions: {
    // Сообщения для toast
    setMessage(
      {message, type, messages}:
      IMessage & { messages: IMessage }
    ) {
      const commonStore = useCommonStore();
      if (Array.isArray(messages)) {
        commonStore.setMessages([]);
        setTimeout(() => {
          commonStore.setMessages(messages);
        });
        return;
      }
      commonStore.setMessage({
        message: '',
        type: '',
      });
      setTimeout(() => {
        commonStore.setMessage({
          message,
          type,
        });
      });
    },
    getIsResponseError(error) {
      if (error) {
        const errors: any[] = [];
        for (const key in error.data) {
          for (const err of error.data[key]) {
            errors.push({ message: err, type: 'error' });
          }
        }
        this.setMessage({ messages: errors });
        return true;
      }
      return false;
    },
    checkIsLogged() {
      if (localStorage.getItem('user')!) {
        this.isLoggedIn = true;
        this.user = JSON.parse(localStorage.getItem('user')!);
      }
    },

    // Регистрация
    async signup(
      { username, email, password }:
      { username: string, email: string, password: string }
      ) {
      const { data, error, ...rest } = await useInterceptorFetch('/users/create/', {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password,
        })
      });
      
      if (this.getIsResponseError(error.value)) {
        return false;
      }
      this.user = { ...data.value };
      return true;
    },
    async signin(
      { username, password }:
      { username: string, password: string }
    ) {
      const { data, error } = await useInterceptorFetch('/users/token/', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        })
      });
      if (this.getIsResponseError(error.value)) {
        this.user = {};
        this.isLoggedIn = false;
        return;
      }
      localStorage.setItem(
        'user',
        JSON.stringify({username}),
      );
      localStorage.setItem(
        'access',
        data.value.access,
      );
      localStorage.setItem(
        'refresh',
        data.value.refresh,
      );
      this.isLoggedIn = true;
      this.user = { ...this.user, ...data.value };
      return true;
    },
    async logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      this.isLoggedIn = false;
      this.user = {};
    },
    async refresh() {
      const { data, error } = await useInterceptorFetch('/users/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({
          refresh: localStorage.getItem('refresh')!,
        }),
      });
      if (this.getIsResponseError(error.value)) {
        this.user = {};
        this.isLoggedIn = false;
        return;
      }
      localStorage.setItem(
        'access',
        data.value.access,
      );
      this.isLoggedIn = true;
      this.user = { ...this.user, ...data.value };
      return `JWT ${data.value.access}`;
    },
  },
});