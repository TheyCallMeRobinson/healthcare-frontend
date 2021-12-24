<template>
  <el-form
    ref="settings"
    :model="settings"
    label-width="120px"
    label-position="top"
    size="medium"
    class="form"
  >
    <h2>Настройки профиля</h2>
    <el-form-item label="Изменить логин">
      <el-input v-model="settings.login"></el-input>
    </el-form-item>
    <el-form-item label="Изменить e-mail">
      <el-input type="email" v-model="settings.email"></el-input>
    </el-form-item>
    <el-form-item label="Изменить пол">
      <el-radio-group v-model="settings.sex">
        <el-radio label="M">Мужской</el-radio>
        <el-radio label="F">Женский</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Изменить возраст">
      <el-input type="date" v-model="settings.birthdate"></el-input>
    </el-form-item>
    <el-form-item label="Имя">
      <el-input v-model="settings.first_name"></el-input>
    </el-form-item>
    <el-form-item label="Фамилия">
      <el-input v-model="settings.mid_name"></el-input>
    </el-form-item>
    <el-form-item label="Отчество">
      <el-input v-model="settings.last_name"></el-input>
    </el-form-item>
    <el-alert
      v-if="wrongPassword"
      title="Пароли должны совпадать"
      type="error"
      :closable="false"
    />
    <el-alert
      v-if="notEnoughSymbols"
      title="Пароль должен содержать не менее восьми символов"
      type="error"
      :closable="false"
    />
    <el-form-item label="Изменить пароль">
      <el-input type="password" v-model="settings.password"></el-input>
    </el-form-item>
    <el-form-item label="Повторите пароль">
      <el-input type="password" v-model="settings.passwordConfirm"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit(settings)" type="primary">Подтвердить</el-button>
      <el-alert v-if="success" title="Успешно изменено" type="success" />
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent } from "vue";
import { patientAPI } from "@/api/EventService";
import PatientSettings from "@/models/pateinetSettings.model";

export default defineComponent({
  props: ["patientProfile"],
  created() {
    setTimeout(() => {
      this.settings = { ...this.patientProfile };
      delete this.settings.age;
    }, 1000);
  },
  data() {
    return {
      settings: {},
      wrongPassword: false,
      notEnoughSymbols: false,
      success: false,
    };
  },
  methods: {
    submit(settings) {
      if (settings.password !== settings.passwordConfirm) {
        this.wrongPassword = true;
        // } else if (settings.password.length < 8) {
        //   this.notEnoughSymbols = true;
      } else {
        this.wrongPassword = false;
        this.notEnoughSymbols = false;
        patientAPI.putPatientById(this.patientProfile.id, settings).then(() => {
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 5000);
        });
      }
    },
  },
});
</script>

<style scoped>
.form {
  max-width: 700px;
}
</style>