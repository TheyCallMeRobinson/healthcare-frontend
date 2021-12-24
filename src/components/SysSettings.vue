<template>
  <el-form
      ref="registration"
      :model="creation"
      :rules="rules"
      label-width="120px"
      label-position="top"
      size="medium"
      class="form"
  >
    <h2>Создание новой аллергии</h2>
    <el-form-item label="Название" prop="allergy_name">
      <el-input type="email" v-model="creation.name"></el-input>
    </el-form-item>
    <el-form-item label="Описание симптомов (просто для красоты)" prop="allergy_description">
      <el-input type="email" v-model="creation.description"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Подтвердить</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {adminAPI} from "@/api/EventService";

export default {
  data() {
    return {
      creation: {},
      rules: {
        name: [
          {
            required: true,
            message: "Введите название аллергии",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: false,
            message: "Введите описание аллергии",
            trigger: "blur",
          },
        ],
      },
    };
  },
  async created() {
    // this.allAllergies = await adminAPI
    //     .getAllergies()
    //     .then((response) => {
    //       return response.data;
    //     });
  },
  methods: {
    async onSubmit() {
      const regData = this.creation;
      const data = {
        name: regData.name,
        //description: regData.description,
      };
      adminAPI.postAllergy(data.name);
    }
  },
};
</script>

<style lang="css" scoped>
.form {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 50px;
}

@media (max-width: 576px) {
  .form {
    padding: 0 10px;
  }

  .el-select .el-input {
    width: 100px;
  }
}
</style>