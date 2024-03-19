import { defineStore } from "pinia";

type MessageType = '' | 'error' | 'info';

interface IMessage {
  messageInfo: {
    message: string;
    type: MessageType;
  };
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