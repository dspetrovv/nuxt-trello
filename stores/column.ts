import { defineStore } from "pinia";

const mockState = [
  { id: 0, name: 'Column 1', type: 'on-hold', tasks: [
    { id: Math.random(), text: 'asd' },
    { id: Math.random(), text: '123' },
  ] }
];

export const useColumnStore = defineStore('column', {
  state: () => ({
    columns: mockState as IColumn[],
  }),
  actions: {
    getColumns() {},
    createTask(text: string) {
      columns.push({ id: new Data().getData(), text });
    },
  },
});