<template>
  <div
    class="task"
    :data-id="id"
    @mousedown.self="onMouseDown"
  >
    <span class="task__delete" @click="deleteTask"></span>
    <div draggable="false">
      <span class="task__id" draggable="false">id:&nbsp;</span>
      <span draggable="false">{{ id }}</span>
    </div>
    <div class="task__description" draggable="false">{{ text }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: Number },
  text: { type: String },
});

const emit = defineEmits(['deleteTask', 'moveTask']);

const deleteTask = () => {
  emit('deleteTask', props.id)
};

const handleMoveTask = ({ targetColumnIndex, prevTaskId }) => {
  emit('moveTask', {
    taskId: props.id,
    row: targetColumnIndex,
    prevTaskId,
  });
};

const { onMouseDown } = useDragNDrop(handleMoveTask);
</script>

<style lang="scss">
.task {
  background-color: var(--dark-gray-color);
  position: relative;
  padding: 25px 10px;
  cursor: move;
  span:not(.task__delete) {
    user-select: none;
    pointer-events: none;
  }
  &__id {
    color: var(--white-color);
  }
  position: relative;
  &__delete {
    position: absolute;
    z-index: 100;
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
    user-select: none;
    pointer-events: none;
    white-space: break-spaces;
    margin-top: 15px;
  }
  &__placeholder {
    background-color: none;
    padding: 0;
    & + .task.task_empty {
      height: 0;
      padding: 0;
    }
  }
  &_empty {
    cursor: initial;
    background: none;
    padding: 0;
    height: 10px;
    position: absolute;
    width: 100%;
  }
}
</style>