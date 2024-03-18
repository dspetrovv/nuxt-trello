<template>
  <div class="columns">
    <div class="columns__column">
      <section class="columns__header">
        On holds ({{ count }})
      </section>
      <section class="columns__cards">
        <column-card
          v-for="(column) in columns"
          :key="column.id"
          :name="column.name"
          :tasks="column.tasks"
          :type="column.type"
        />
      </section>
      <section class="columns__buttons">
        <button></button>
      </section>
    </div>
  </div>
</template>
<script setup>
const columnStore = useColumnStore();

const { columns } = storeToRefs(columnStore);
</script>