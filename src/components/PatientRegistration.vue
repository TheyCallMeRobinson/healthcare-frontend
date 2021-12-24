<template>
  <el-form
    ref="patientRegistration"
    :model="patientRegistration"
    :rules="rules"
    label-width="120px"
    label-position="top"
    size="medium"
    class="form"
  >
    <h2>Регистрация</h2>
    <el-form-item label="Имя" prop="first_name">
      <el-input v-model="patientRegistration.first_name"></el-input>
    </el-form-item>
    <el-form-item label="Фамилия" prop="mid_name">
      <el-input v-model="patientRegistration.mid_name"></el-input>
    </el-form-item>
    <el-form-item label="Отчество" prop="last_name">
      <el-input v-model="patientRegistration.last_name"></el-input>
    </el-form-item>
    <el-form-item label="Пол" prop="sex">
      <el-radio-group v-model="patientRegistration.sex">
        <el-radio label="M">Мужский</el-radio>
        <br />
        <el-radio label="F">Женский</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Дата рождения" prop="birthdate">
      <el-input
        type="date"
        placeholder="YYYY-MM-DD"
        v-model="patientRegistration.birthdate"
      ></el-input>
    </el-form-item>
    <el-form-item label="Login" prop="login">
      <el-input type="email" v-model="patientRegistration.login"></el-input>
    </el-form-item>
    <el-form-item label="E-mail" prop="email">
      <el-input type="email" v-model="patientRegistration.email"></el-input>
    </el-form-item>
    <el-form-item label="Номер телефона" prop="phone_number">
      <el-input
        type="tel"
        v-model="patientRegistration.phone_number"
      ></el-input>
    </el-form-item>
    <el-form-item label="Пароль" prop="password">
      <el-input
        type="password"
        v-model="patientRegistration.password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Подтвердить</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PatientReg from "@/models/patientReg.model";
import { patientAPI } from "@/api/EventService";
import router from "@/router";

export default defineComponent({
  data() {
    return {
      patientRegistration: {} as PatientReg,
      rules: {
        first_name: [
          {
            required: true,
            message: "Введите ваше имя",
            trigger: "blur",
          },
        ],
        mid_name: [
          {
            required: true,
            message: "Введите вашу фамилию",
            trigger: "blur",
          },
        ],
        last_name: [
          {
            required: true,
            message: "Введите ваше отчество",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "Введите ваш пол",
            trigger: "blur",
          },
        ],
        login: [
          {
            required: true,
            message: "Введите ваш логин",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Введите ваш e-mail",
            trigger: "blur",
          },
        ],
        birthdate: [
          {
            required: true,
            message: "Дата рождения",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Введите ваш пароль",
            trigger: "blur",
          },
        ],
        phone_number: [
          {
            required: true,
            message: "Введите ваш телефон",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      await patientAPI.postPatient(this.patientRegistration);
      return router.push("/authorization/login").catch((error) => {
        console.log(error.response.body);
      });
    },
  },
});
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
}
</style>