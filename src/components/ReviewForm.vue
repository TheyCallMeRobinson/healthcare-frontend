<template>
  <router-link :to="{ name: 'profile' }">
    <el-button icon="el-icon-arrow-left">Назад</el-button>
  </router-link>
  <el-form class="form" label-position="top" size="medium">
    <el-form-item label="Ваша оценка" class="rating-item">
      <el-rate v-model="reviewForm.mark"> </el-rate>
    </el-form-item>
    <el-form-item label="Комментарий">
      <el-input type="textarea" v-model="reviewForm.comment"></el-input>
    </el-form-item>
    <el-button type="primary" @click="sendComment()">Отправить</el-button>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Review from "../models/review.model";
import {patientAPI} from "@/api/EventService";

export default defineComponent({
  data() {
    return {
      reviewForm: {} as Review,
    };
  },
  methods: {
    sendComment() {
      patientAPI.postComment(this.reviewForm.doctorId, this.reviewForm);
      //console.log(this.reviewForm);
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