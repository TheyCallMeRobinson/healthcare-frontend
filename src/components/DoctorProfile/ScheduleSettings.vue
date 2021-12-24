<template>
  <el-form
    ref="formData"
    :model="doctorProfile.weekends"
    label-width="120px"
    label-position="top"
    size="medium"
    class="form"
  >
    <h1>Выходные дни</h1>
    <el-form-item>
      <el-checkbox-group v-model="weekends" :max="2">
        <el-checkbox-button
          v-for="day in days"
          :label="day"
          :key="day"
          @dblclick="addWeekend(day)"
          >{{ day }}</el-checkbox-button
        >
      </el-checkbox-group>
    </el-form-item>
    <el-form-item v-if="!editMode">
      <el-button type="info" @click="editMode = !editMode">Редактировать</el-button>
    </el-form-item>
    <el-form-item v-if="editMode">
      <el-button type="primary" @click="saveChanges">Готово</el-button>
      <el-button type="info" @click="resetWeekends">Сбросить</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from "vuex";
const weekDays = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

export default {
  props: ["doctorProfile"],
  data() {
    return {
      days: weekDays,
      editMode: false,
    };
  },
  computed: {
    weekends() {
      let arr = [];
      for (let weekend in this.doctorProfile.weekends) {
        switch (this.doctorProfile.weekends[weekend]) {
          case 1:
            arr.push("Понедельник");
            break;
          case 2:
            arr.push("Вторник");
            break;
          case 3:
            arr.push("Среда");
            break;
          case 4:
            arr.push("Четверг");
            break;
          case 5:
            arr.push("Пятница");
            break;
          case 6:
            arr.push("Суббота");
            break;
          case 7:
            arr.push("Воскресенье");
            break;
          default:
            break;
        }
      }
      return arr;
    },
  },
  methods: {
    ...mapActions(["addWeekend", "resetWeekends"]),
    // selectDay(day) {
    //   if (!this.editMode) return;
    //   this.$store.dispatch("doctorProfile/addWeekend", day, { root: true });
    // },
    // reset() {
    //   this.$store.dispatch("doctorProfile/resetWeekends", null, { root: true });
    // },
    resetWeekends() {
      console.log("sfgfs");
    },
    saveChanges() {
      this.editMode = !this.editMode;
      this.$emit("update-weekends");
    },
  },
};
</script>

<style lang="css" scoped>
.form {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 50px;
}
@media (max-width: 576px) {
  .form {
    padding: 0 10px;
  }
}
</style>
