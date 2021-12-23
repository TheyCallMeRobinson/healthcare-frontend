<template>
  <router-link :to="{ name: 'profile' }"
    ><el-button icon="el-icon-arrow-left">Назад</el-button></router-link
  >
  <el-form class="form" label-position="top" size="medium">
    <el-form-item label="Результаты осмотра">
      <el-input type="textarea" v-model="reportForm.visitResults"></el-input>
    </el-form-item>
    <el-form-item label="Комментарий">
      <el-input type="textarea" v-model="reportForm.recipe"></el-input>
    </el-form-item>
    <el-button type="primary" @click="onSubmit">Отправить</el-button>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {adminAPI, doctorAPI} from "@/api/EventService";

export default defineComponent({
  data() {
    return {
      reportForm: {
        visitResults: "",
        recipe: "",
      },
    };
  },
  methods: {
    onSubmit() {
      //ToDo: проверить вызов апи
      const regData = this.reportForm;
      const data = {
        visitResults: regData.visitResults,
        recipe: regData.recipe
      };
      doctorAPI.postReport(data);
    },
  },
});
</script>

<style scoped>
.form {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 50px;
}
@media (max-width: 576px) {
  .form {
    padding: 0 10px;
  }
}
.rating-item {
  display: flex;
  align-items: center;
}
</style>