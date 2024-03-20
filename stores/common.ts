import { defineStore } from "pinia";

export type MessageType = '' | 'error' | 'info';

interface IMessage {
  message: string;
  type: MessageType;
};

export const useCommonStore = defineStore('common', {
  state: () => ({
    messageInfo: {
      message: '',
      type: '',
    } as IMessage,
  }),
  actions: {
    setMessage({message, type}: {message: string, type: MessageType}) {
      this.messageInfo = { message, type };
    },
  },
});