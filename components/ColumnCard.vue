<template>
  <div class="column">
    <section class="column__header">
      {{ name }} 
    </section>
    <section class="column__cards">
      <task-card
        v-for="(task) in tasks"
        :key="task.id"
        :id="task.id"
        :text="task.text"
      />
    </section>
    <section class="column__actions">
      <textarea name="text" cols="5" v-model="taskText"></textarea>
      <div class="column__actions-button">
        <button>Добавить карточку</button>
        <div class="column__actions-close">X</div>
      </div>
    </section>
    <section class="column__add-button">
      +&nbsp;&nbsp;Добавить карточку
    </section>
  </div>
</template>

<script setup lang="ts">
interface IColumnCardProps {
  name: string;
};

import {ComponentObjectPropsOptions, ref, toRefs} from "vue";

const props = defineProps<ComponentObjectPropsOptions<IColumnCardProps>>({
  name: { type: String, default: '' },
});

const { name } = toRefs(props);
const taskText = ref('');
</script>

<style lang="scss" scoped>
.column {
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
  }
  &__actions {
    display: flex;
    flex-direction: column;
    gap: 15px;
    textarea {
      width: 100%;
      background-color: var(--gray-color-secondary);
    }
    &-button {
      display: flex;
      gap: 10px;
      button {
        background-color: var(--gray-color-third);
        width: 150px;
        padding: 5px;
        text-align: center;
        font-size: 24px;
        color: var(--white-color-secondary);
      }
    }
    &-close {
      font-size: 24px;
    }
  }
  &__add-button {
    margin-top: 5px;
    &:hover {
      background-color: #26282c;
    }
  }
}
</style>