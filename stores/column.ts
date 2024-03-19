import { defineStore } from "pinia";
import { IColumn } from "../types/card";

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
    saveColumns() {
      localStorage.setItem('columns', JSON.stringify(this.columns))
    },
    getColumns() {
      this.columns = JSON.parse(localStorage.getItem('columns')!);
    },
    createTask({ idx, description }: { idx: number, description: string }) {
      this.columns[idx].tasks.push({ id: Math.random(), description });
      this.saveColumns();
    },
    deleteTask({ taskId, idx }: { taskId: number, idx: number }) {
      const index = this.columns[idx].tasks.findIndex((task) => task.id === taskId);
      this.columns[idx].tasks.splice(index, 1)
      this.saveColumns();
    },
    moveTask({
        taskId,
        taskIdx,
        currentColumnIndex,
        targetColumnIndex,
        prevTaskId,
      }: {
      taskId: number,
      taskIdx: number,
      currentColumnIndex: number, // индекс текущей колонки
      targetColumnIndex: number, // индекс таргетной колонки
      prevTaskId: string | undefined,
    }) {
      const task = this.columns[currentColumnIndex].tasks.find((task) => task.id === taskId);
      this.columns[currentColumnIndex].tasks.splice(taskIdx, 1);

      const prevTaskIndex = this.columns[targetColumnIndex].tasks.findIndex((task) => `${task.id}` === prevTaskId);

      if (prevTaskIndex !== -1) {
        this.columns[targetColumnIndex].tasks.splice(prevTaskIndex + 1, 0, task)
      } else {
        this.columns[targetColumnIndex].tasks.unshift(task);
      }
      this.saveColumns();
    },
  },
});