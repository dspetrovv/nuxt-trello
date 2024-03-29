<template>
  <div class="column" :data-index="idx">
    <section :class="['column__header', `column__header_${type}`]">
      {{ name }} ({{ count }})
    </section>
    <section :class="{column__cards: true, column__cards_empty: !tasks.length}">
      <task-card
        v-if="tasks.length"
        v-for="(task, idx) in tasks"
        :key="task.id"
        :id="task.id"
        :description="task.description"
        :idx="idx"
        @deleteTask="deleteTask"
        @moveTask="moveTask"
      />
      <div v-else class="task task_empty"></div>
    </section>
    <section v-show="isActionsOpen" class="column__actions">
      <textarea
        v-model="taskDescription"
        name="text"
        rows="5"
        cols="5"
        placeholder="Ввести заголовок для этой карточки"
      ></textarea>
      <div class="column__actions-button">
        <button @click="addTask">Добавить карточку</button>
        <span
          class="column__actions-close"
          @click="openActions"
        ></span>
      </div>
    </section>
    <section
      v-show="!isActionsOpen"
      class="column__add-button"
      @click="openActions"
    >
      <span></span>&nbsp;&nbsp;Добавить карточку
    </section>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  idx: { type: Number, default: 0 },
  name: { type: String, default: '' },
  tasks: { type: Array, default: [] },
  type: { type: String, default: '' },
  count: { type: Number, default: 0 },
});

const taskDescription = ref('');
const isActionsOpen = ref(false);

const columnStore = useColumnStore();

const openActions = () => {
  isActionsOpen.value = !isActionsOpen.value;
};

const addTask = () => {
  columnStore.createTask({ idx: props.idx, description: taskDescription.value });
  taskDescription.value = '';
  openActions();
};

const deleteTask = (id) => {
  columnStore.deleteTask({ idx: props.idx, taskId: id })
};

const moveTask = (params) => {
  columnStore.moveTask({ ...params, currentColumnIndex: props.idx });
};
</script>

<style lang="scss">
.column {
  width: 356px;
  background-color: var(--gray-color);
  height: fit-content;
  &__header {
    text-transform: uppercase;
    color: var(--white-color);
    font-size: 32px;
    padding: 10px;
    &_on-hold {
      background-color: #e8814b;
    }
    &_in-progress {
      background-color: #428db6;
    }
    &_needs-review {
      background-color: #ecc955;
    }
    &_approved {
      background-color: #50ae67;
    }
  }
  &__cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    &_empty {
      padding: 0 10px;
    }
  }
  &__actions {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px;
    textarea {
      background-color: var(--gray-color-secondary);
      padding: 10px;
      color: var(--white-color-secondary);
      outline: none;
      border-radius: 0;
      font-size: 16px;
      border: 0;
      resize: none;
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: var(--dark-gray-color);
      }
    }
    &-button {
      display: flex;
      gap: 20px;
      padding-bottom: 10px;
      button {
        background-color: var(--gray-color-third);
        width: 155px;
        padding: 5px;
        text-align: center;
        color: var(--white-color-secondary);
        outline: none;
        border: 0;
        cursor: pointer;
      }
    }
    &-close {
      position: relative;
      width: 20px;
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 2px;
        left: 0;
        top: calc(50% - 2px);
        background-color: var(--base-color);
      }
      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }
  }
  &__add-button {
    margin-top: 5px;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #26282c;
    }
    span {
      position: relative;
      width: 20px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 2px;
        left: 0;
        top: calc(50% - 2px);
        background-color: var(--base-color);
      }
      &::after {
        transform: rotate(90deg);
        height: 1.5px;
      }
    }
  }
}
</style>