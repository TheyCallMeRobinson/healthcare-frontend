<template>
  <el-tabs type="card" v-model="activeName">
    <el-tab-pane label="История" name="first">
      <History :oldVisits="oldVisits" />
    </el-tab-pane>
    <el-tab-pane label="Запись" name="second">
      <Future :newVisits="newVisits" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { defineComponent } from "vue";
import Future from "./Future.vue";
import History from "./History.vue";
import {patientAPI} from "@/api/EventService";

export default defineComponent({
  data() {
    return {
      activeName: "first",
      // visits: [],
      visits: [
        {
          id: 0,
          doctorName: "Иванов И.И.",
          result: "",
          recipe: "",
          dateAndTime: "11.09.2021 18:30",
          status: "new",
        },
        {
          id: 1,
          doctorName: "Сидоров В.К.",
          result: "Простуда",
          recipe: "Аспирин 7 дней 1 таблетка в день",
          dateAndTime: "05.09.2021 15:30",
          status: "old",
        },
        {
          id: 2,
          doctorName: "Фёдоров Д.С.",
          result: "Травма колена",
          recipe: "Тейпинг",
          dateAndTime: "06.09.2021 17:30",
          status: "old",
        },
        {
          id: 3,
          doctorName: "Петров Д.Б.",
          result: "string",
          recipe: "string",
          dateAndTime: "13.09.2021 16:00",
          status: "new",
        },
      ],
    };
  },
  async created() {
    this.visits = await patientAPI.getVisitsByPatientId(this.patientId)
        .then((response) => {
          return response.data;
        });
  },
  components: {
    History,
    Future,
  },
  computed: {
    newVisits() {
      return this.visits.filter((visit) => visit.status === "new");
    },
    oldVisits() {
      return this.visits.filter((visit) => visit.status === "old");
    },
  },
});
</script>

<style scoped>
@media (max-width: 720px) {
  .table {
    overflow-x: scroll;
  }
}
</style>