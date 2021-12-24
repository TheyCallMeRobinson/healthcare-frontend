<template>
  <el-table class="table" :data="diseases" style="width: 100%">
    <el-table-column type="index" label="№" min-width="50"> </el-table-column>
    <el-table-column prop="name" label="Название" min-width="150">
    </el-table-column>
    <el-table-column prop="start_date" label="Начало" min-width="100">
    </el-table-column>
    <el-table-column prop="end_date" label="Конец" min-width="100">
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { patientAPI } from "@/api/EventService";
import Disease from "@/models/disease.model";

export default defineComponent({
  props: {
    patientId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      diseases: [] as Disease[],
    };
  },
  created() {
    patientAPI.getPatientDiseases(this.patientId).then((response) => {
      this.diseases = response.data;
    }).catch((error) => {
      console.log(error)
    });
  },
});
</script>

<style scoped>
@media (max-width: 720px) {
}
.table {
  overflow-x: scroll;
}
</style>