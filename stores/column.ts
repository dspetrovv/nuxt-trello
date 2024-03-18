import { defineStore } from "pinia";

const mockState = [
  { id: 0, name: 'Column 1', type: 'on-hold', tasks: [
    { id: Math.random(), description: 'asd' },
    { id: Math.random(), description: '123' },
  ] },
  { id: 1, name: 'Column 2', type: 'in-progress', tasks: [
    { id: Math.random(), description: 'description' },
    { id: Math.random(), description: 'qwerty' },
    { id: Math.random(), description: 'row' },
  ] },
  { id: 3, name: 'Column 3', type: 'needs-review', tasks: [] },
];

export const useColumnStore = defineStore('column', {
  state: () => ({
    columns: mockState as IColumn[],
  }),
  actions: {
    getColumns() {
      this.columns = JSON.parse(localStorage.getItem('columns'));
    },
    createTask({ idx, description }: { idx: number, description: string }) {
      this.columns[idx].tasks.push({ id: Math.random(), description });
      localStorage.setItem('columns', JSON.stringify(this.columns))
    },
    deleteTask({ taskId, idx }: { taskId: number, idx: number }) {
      const index = this.columns[idx].tasks.findIndex((task) => task.id === taskId);
      this.columns[idx].tasks.splice(index, 1)
      localStorage.setItem('columns', JSON.stringify(this.columns))
    },
  },
});