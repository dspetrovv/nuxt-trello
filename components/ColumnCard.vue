<template>
  <div class="column">
    <section :class="['column__header', `column__header_${type}`]">
      {{ name }} ({{ count }})
    </section>
    <section class="column__cards">
      <task-card
        v-for="(task) in tasks"
        :key="task.id"
        :id="task.id"
        :text="task.text"
      />
    </section>
    <section v-show="isActionsOpen" class="column__actions">
      <textarea
        v-model="taskText"
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
        >X</span>
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

<script setup lang="ts">
import {
  computed,
  ref,
  toRefs
} from "vue";

const props = defineProps({
  name: { type: String, default: '' },
  tasks: { type: [], default: [] },
  type: { type: String, default: '' },
});

const { name, tasks } = toRefs(props);

const taskText = ref('');
const isActionsOpen = ref(false);
const count = computed(() => {
  return tasks.length;
});

const columnStore = useColumnStore();

const addTask = () => {
  columnStore.createTask(taskText);
};

const openActions = () => {
  isActionsOpen.value = !isActionsOpen.value;
};
</script>

<style lang="scss" scoped>
.column {
  width: 356px;
  background-color: var(--gray-color);
  &__header {
    text-transform: capitalize;
    color: var(--white-color);
    font-size: 32px;
    padding: 10px;
    padding-bottom: 0;
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
  }
  &__actions {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px;
    padding-top: 0;
    textarea {
      background-color: var(--gray-color-secondary);
      padding: 10px;
      color: var(--white-color-secondary);
      outline: none;
      border-radius: 0;
      font-size: 16px;
      border: 0;
      resize: none;
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