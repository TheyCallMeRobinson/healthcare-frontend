<template>
  <el-table
    class="table"
    v-for="day in reports"
    :key="day.id"
    :data="day.slots"
    :row-class-name="tableRowClassName"
    style="max-width: 500px"
  >
    >
    <el-table-column :label="day.day" prop="time" width="300"></el-table-column>
    <el-table-column label="Действия">
      <router-link :to="{ name: 'addReport' }">
        <el-button icon="el-icon-edit" size="small">Отчёт</el-button>
      </router-link>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    tableRowClassName({ row }: any) {
      if (row.isFree === true) {
        return "success-row";
      } else {
        return "warning-row";
      }
    },
  },

  data() {
    return {
      //ToDo: убрать хардкод
      //ToDo: куда прикрепляется этот элемент?
      reports: [
        {
          day: "Пн",
          slots: [
            {
              id: 1,
              time: new Date(2021, 8, 2, 12, 40),
              isFree: true,
            },
            {
              id: 2,
              time: new Date(2021, 8, 2, 16, 40),
              isFree: true,
            },
            {
              id: 3,
              time: new Date(2021, 8, 2, 17, 45),
              isFree: true,
            },
          ],
        },
        {
          day: "Вт",
          slots: [
            {
              id: 4,
              time: new Date(2021, 8, 3, 17, 20),
              isFree: true,
            },
            {
              id: 5,
              time: new Date(2021, 8, 3, 17, 50),
              isFree: true,
            },
            {
              id: 6,
              time: new Date(2021, 8, 3, 18, 30),
              isFree: true,
            },
          ],
        },
        {
          day: "Ср",
          slots: [
            {
              id: 7,
              time: new Date(2021, 8, 4, 18, 30),
              isFree: true,
            },
            {
              id: 8,
              time: new Date(2021, 8, 4, 18, 30),
              isFree: true,
            },
            {
              id: 9,
              time: new Date(2021, 8, 4, 18, 30),
              isFree: true,
            },
          ],
        },
        {
          day: "Чт",
          slots: [
            {
              id: 10,
              time: new Date(2021, 8, 5, 18, 30),
              isFree: true,
            },
            {
              id: 11,
              time: new Date(2021, 8, 5, 18, 30),
              isFree: true,
            },
            {
              id: 12,
              time: new Date(2021, 8, 5, 18, 30),
              isFree: true,
            },
          ],
        },
        {
          day: "Пт",
          slots: [
            {
              id: 13,
              time: new Date(2021, 8, 6, 18, 30),
              isFree: true,
            },
            {
              id: 14,
              time: new Date(2021, 8, 6, 18, 30),
              isFree: true,
            },
            {
              id: 15,
              time: new Date(2021, 8, 6, 18, 30),
              isFree: true,
            },
          ],
        },
        {
          day: "Сб",
          slots: [
            {
              id: 16,
              time: new Date(2021, 8, 7, 18, 30),
              isFree: true,
            },
            {
              id: 17,
              time: new Date(2021, 8, 7, 18, 30),
              isFree: true,
            },
            {
              id: 18,
              time: new Date(2021, 8, 7, 18, 30),
              isFree: true,
            },
          ],
        },
        {
          day: "Вс",
          slots: [
            {
              id: 19,
              time: new Date(2021, 8, 8, 18, 30),
              isFree: true,
            },
            {
              id: 20,
              time: new Date(2021, 8, 8, 18, 30),
              isFree: true,
            },
            {
              id: 21,
              time: new Date(2021, 8, 8, 18, 30),
              isFree: true,
            },
          ],
        },
      ],
    };
  },
  computed: {},
});
</script>




<style scoped>
@media (max-width: 720px) {
  .table {
    overflow-x: scroll;
  }
}
</style>