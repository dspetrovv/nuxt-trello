<template>
  <div class="columns">
    <column-card
      :row="'0'"
      :name="'on hold'"
      :tasks="onHold"
      :type="'on-hold'"
    />
    <column-card
      :row="'1'"
      :name="'in progress'"
      :tasks="inProgress"
      :type="'in-progress'"
    />
    <column-card
      :row="'2'"
      :name="'needs review'"
      :tasks="needsReview"
      :type="'needs-review'"
    />
    <column-card
      :row="'3'"
      :name="'approved'"
      :tasks="approved"
      :type="'approved'"
    />
  </div>
</template>
<script setup>
import {onMounted} from "vue";

useHead({
  title: 'Главная',
});

const columnStore = useColumnStore();

const {
  onHold,
  inProgress,
  needsReview,
  approved,
} = storeToRefs(columnStore);

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