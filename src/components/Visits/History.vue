<template>
  <el-table class="table" :data="oldVisits" style="width: 100%">
    <el-table-column type="index" label="№"> </el-table-column>
    <el-table-column prop="result" label="Результат"> </el-table-column>
    <el-table-column prop="recipe" label="Рецепт"> </el-table-column>
    <el-table-column prop="doctorName" label="Имя врача"> </el-table-column>
    <el-table-column prop="date" label="Дата"> </el-table-column>
    <el-table-column prop="startTime" label="Время"> </el-table-column>
    <el-table-column label="Действия">
      <router-link :to="{ name: 'addReview' }">
        <el-button icon="el-icon-star-off" size="small">Отзыв</el-button>
      </router-link>
      <router-link :to="{ name: 'newVisit' }">
        <el-button icon="el-icon-edit" size="small">Повтор</el-button>
      </router-link>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    oldVisits: [],
  },
  data() {
    return {};
  },
});
</script>