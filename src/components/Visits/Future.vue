<template>
  <el-table class="table" :data="newVisits" style="width: 100%">
    <el-table-column type="index" label="№"></el-table-column>
    <el-table-column prop="doctorName" label="Имя врача"></el-table-column>
    <el-table-column prop="dateAndTime" label="Дата"></el-table-column>
    <el-table-column label="Действия">
      <template #default="scope">
        <el-button type="text" size="small" @click.prevent="deleteVisit(scope.row.id)">Удалить</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {patientAPI} from "@/api/EventService";

export default defineComponent({
  props: {
    newVisits: [],
  },
  data() {
    return {};
  },
  methods: {
    deleteVisit(id: any) {
      patientAPI.deleteVisitById(id);
    },
  },
});
</script>