<template>
  <div class="columns">
    <column-card
      v-for="(column, idx) in columns"
      :key="column.id"
      :idx="idx"
      :name="column.name"
      :tasks="column.tasks"
      :type="column.type"
      :count="column.tasks.length"
    />
  </div>
</template>
<script setup>
import {onMounted} from "vue";
const columnStore = useColumnStore();

const { columns } = storeToRefs(columnStore);

onMounted(() => {
  columnStore.getColumns();
});
</script>
<style lang="scss" scoped>
.columns {
  display: flex;
  gap: 20px;
}
</style>