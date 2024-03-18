<template>
  <div class="task">
    <div class="task__id">
      <span>id:&nbsp;</span>
      <span>{{ id }}</span>
    </div>
    <div>{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
interface ITask {
  id: number;
  text: string;
};

import {ComponentObjectPropsOptions, toRefs} from "vue";

const props = defineProps<ComponentObjectPropsOptions<ITask>>({
  id: { type: Number },
  text: { type: String },
});

const { id, text } = toRefs(props);
</script>

<style lang="scss" scoped>
.task {
  background-color: var(--dark-gray-color);
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: relative;
  padding: 20px 10px;
  &__id {
    &:first-child {
      color: var(--white-color);
    }
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 1px;
    background-color: var(--light-gray-color);
  }
  &::before {
    right: 10px;
    transform: rotate(45deg);
  }
  &::after {
    top: 7px;
    right: 10px;
    transform: rotate(-45deg);
  }
}
</style>