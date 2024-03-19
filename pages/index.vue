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

useHead({
  title: 'Главная',
});

const columnStore = useColumnStore();

const { columns } = storeToRefs(columnStore);

onMounted(() => {
  columnStore.getColumns();
});
</script>
<style lang="scss" scoped>
.columns {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(356px, 1fr));
}
</style>