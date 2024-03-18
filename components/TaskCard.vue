<template>
  <div class="task">
    <span class="task__delete" @click="deleteTask"></span>
    <div>
      <span class="task__id">id:&nbsp;</span>
      <span>{{ id }}</span>
    </div>
    <div class="task__description">{{ description }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: Number },
  description: { type: String },
});

const emit = defineEmits(['deleteTask']);

const deleteTask = () => {
  emit('deleteTask', props.id)
};
</script>

<style lang="scss" scoped>
.task {
  background-color: var(--dark-gray-color);
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  padding: 25px 10px;
  &__id {
    color: var(--white-color);
  }
  position: relative;
  &__delete {
    position: absolute;
    top: 10px;
    right: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 15px;
      height: 2px;
      background-color: var(--light-gray-color);
      top: 10px;
      right: 5px;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
  &__description {
    white-space: break-spaces;
  }
}
</style>