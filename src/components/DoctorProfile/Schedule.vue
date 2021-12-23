<template>
  <el-table
    class="table"
    v-for="day in schedule"
    :key="day.id"
    :data="day.slots"
    :row-class-name="tableRowClassName"
    style="max-width: 220px"
  >
    <el-table-column :label="day.day" prop="time" width="100">
    </el-table-column>
    <el-table-column prop="id">
      <el-button icon="el-icon-delete" class="delete-button" size="small"
        >Удалить Shedule.vue</el-button
      >
      <router-link :to="{ name: 'addReport' }">
        <el-button
          class="report-button"
          icon="el-icon-edit"
          size="small"
          style="width: 100px"
          >Отчёт</el-button
        >
      </router-link>
    </el-table-column>
    <!-- <el-button size="small" @click="deleteDay(day.id)">Выходной</el-button> -->
  </el-table>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: ["doctorProfile"],
  data() {
    return {
      schedule: [],
    };
  },
  created() {
    this.cutWeekends();
  },
  // mounted() {
  //   setTimeout(
  //     () =>
  //       doctorAPI.getSchedule(this.doctorProfile.id).then((response) => {
  //         this.schedule = response.data;
  //       }),
  //     2000
  //   );
  // },
  methods: {
    tableRowClassName({ row }) {
      let className = "";
      if (row.isFree === true) {
        className = "success-row";
      } else {
        className = "warning-row";
      }
      if (this.isExpired(row.time)) {
        className += " report-row";
      }
      return className;
    },
    isExpired(time) {
      let now = new Date();
      let date = new Date(time);
      if (now > date) return true;
      return false;
    },
    cutWeekends() {
      this.schedule = [...this.doctorProfile.schedule];
      for (
        let weekend = this.doctorProfile.weekends.length - 1;
        weekend >= 0;
        weekend--
      ) {
        this.schedule.splice(this.doctorProfile.weekends[weekend] - 1, 1);
      }
    },
    // deleteDay(dayId: number) {
    //   EventService.deleteSlot(dayId);
    //   EventService.getSchedule()
    //     .then((response) => {
    //       this.schedule = response.data;
    //     })
    //     .catch((error) => console.log(error));
    // },
  },
  computed: {},
});
</script>

<style>
.el-table .success-row {
  background-color: #9fe99fc7;
}

.el-table .warning-row {
  background-color: #c07c7cd5;
}

.delete-button {
  display: none;
}
h5 {
  text-align: left;
}
.el-table .report-button {
  display: none;
}

.el-table .report-row .report-button {
  display: block;
}

.el-table .report-row .delete-button {
  display: none;
}
</style>


<style scoped>
@media (max-width: 720px) {
  .table {
    overflow-x: scroll;
  }
}
</style>