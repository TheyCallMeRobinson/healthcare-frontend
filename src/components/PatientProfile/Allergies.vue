<template>
  <el-table :data="allergies" style="width: 100%">
    <el-table-column type="index" label="№" min-width="50"> </el-table-column>
    <el-table-column prop="name" label="Название" min-width="200">
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Allergy from "@/models/allergy.model";
import { patientAPI } from "@/api/EventService";

export default defineComponent({
  props: {
    patientId: {
      type: Number,
      required: true,
    },
    example: {
      type: Array,
    },
  },
  data() {
    return {
      allergies: [] as Allergy[],
    };
  },
  created() {
    patientAPI.getPatientAllergies(this.patientId).then((response) => {
      this.allergies = response.data;
    });
  },
});
</script>

<style scoped>
</style>

