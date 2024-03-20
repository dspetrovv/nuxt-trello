import { defineStore } from "pinia";
import { MessageType, useCommonStore } from "./common";

interface ITask {
  id: number;
  row: string;
  seq_num: number;
  text: string;
};

const mockState = [
  { id: 0, row: '0', seq_num: 0, text: 'asd', },
  { id: 1, row: '0', seq_num: 1, text: 'text', },
  { id: 2, row: '0', seq_num: 2, text: 'desc', },
  { id: 3, row: '1', seq_num: 0, text: '123', },
  { id: 4, row: '1', seq_num: 1, text: 'row', },
  { id: 5, row: '2', seq_num: 0, text: 'third', },
];

export const useColumnStore = defineStore('column', {
  state: () => ({
    tasks: [] as ITask[],
  }),
  actions: {
    setMessage({message, type}: {message: string, type: MessageType}) {
      const commonStore = useCommonStore();
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
        this.setMessage({
          message: error.data,
          type: 'error',
        });
        return true;
      }
      return false;
    },
    saveColumns() {
      localStorage.setItem('columns', JSON.stringify(this.tasks))
    },
    async getColumns() {
      this.tasks = JSON.parse(localStorage.getItem('columns')!);
      const { data, error } = await useInterceptorFetch('/cards/');

      if (this.getIsResponseError(error.value)) {
        return;
      }
      this.tasks = data.value ?? [];
      this.saveColumns();
    },
    async createTask({ row, text }: { row: string, text: string }) {
      const { data, error } = await useInterceptorFetch('/cards/', {
        method: 'POST',
        body: {
          row,
          text,
        }
      });

      if (this.getIsResponseError(error.value)) {
        return;
      }
      
      this.tasks.push(data.value);
      this.saveColumns();
    },
    async deleteTask({ taskId }: { taskId: number }) {
      const { error } = await useInterceptorFetch(`/cards/${taskId}`, {
        method: 'delete',
      });

      if (this.getIsResponseError(error.value)) {
        return;
      }
      const index = this.tasks.findIndex((task) => task.id === taskId);
      this.tasks.splice(index, 1);
      this.saveColumns();
    },
    async moveTask({
        taskId,
        row,
        prevTaskId,
      }: {
      taskId: number,
      row: string,
      prevTaskId: string,
    }) {
      const task = this.tasks.find((task) => task.id === taskId);
      // const index = this.tasks.findIndex((task) => task.id === taskId);
      // this.tasks[index].row = row;

      const prevTask = this.tasks.find((task) => {
        if (prevTaskId === null) {
          return false;
        }
        return task.id === Number(prevTaskId);
      });

      const { data, error } = await useInterceptorFetch(`/cards/${taskId}`, {
        method: 'PATCH',
        body: {
          row,
          seq_num: Number(
            prevTask?.seq_num ? prevTask.seq_num - 1 : 0
          ),
        }
      });
      if (this.getIsResponseError(error.value)) {
        return;
      }
      const index = this.tasks.findIndex((task) => task.id === taskId);
      this.tasks.splice(index, 1);
      
      this.tasks.push(data.value);
      this.saveColumns();
    },
  },
  getters: {
    onHold: (state) => {
      return state.tasks.filter((task) => task.row === '0');
    },
    inProgress: (state) => {
      return state.tasks.filter((task) => task.row === '1');
    },
    needsReview: (state) => {
      return state.tasks.filter((task) => task.row === '2');
    },
    approved: (state) => {
      return state.tasks.filter((task) => task.row === '3');
    },
  },
});