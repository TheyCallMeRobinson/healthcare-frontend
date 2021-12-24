<template>
  <el-form
    ref="registration"
    :model="registration"
    :rules="rules"
    label-width="120px"
    label-position="top"
    size="medium"
    class="form"
  >
    <h2>Регистрация администраторов и докторов</h2>
    <el-form-item label="Логин" prop="login">
      <el-input type="email" v-model="registration.login"></el-input>
    </el-form-item>
    <el-form-item label="E-mail" prop="email">
      <el-input type="email" v-model="registration.email"></el-input>
    </el-form-item>
    <el-form-item label="Пароль" prop="password">
      <el-input type="password" v-model="registration.password"></el-input>
    </el-form-item>

    <div v-if="userType === 'doctor'">
      <el-form-item label="Имя" prop="first_name">
        <el-input v-model="registration.first_name"></el-input>
      </el-form-item>
      <el-form-item label="Фамилия" prop="mid_name">
        <el-input v-model="registration.mid_name"></el-input>
      </el-form-item>
      <el-form-item label="Отчество" prop="last_name">
        <el-input v-model="registration.last_name"></el-input>
      </el-form-item>

      <el-form-item
        v-for="(speciality, i) in currentSpecialities"
        :key="speciality"
        :label="'Специальность ' + ++i"
        prop="speciality"
      >
        <el-input type="date" v-model="speciality.receive_date"> </el-input>

        <el-select v-model="speciality.id" placeholder="Специальность">
          <el-option
            v-for="spec in allSpecialities"
            :key="spec.id"
            :value="spec.id"
            :label="spec.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="addSpeciality">+</el-button>
          <el-button type="primary" @click="removeSpeciality">-</el-button>
        </el-button-group>
      </el-form-item>
    </div>

    <el-form-item label="Тип пользователя" prop="userType">
      <el-radio-group v-model="userType">
        <el-radio label="admin">Админ</el-radio>
        <el-radio label="doctor">Доктор</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Подтвердить</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { adminAPI, doctorAPI } from "@/api/EventService";
export default {
  //TODO: check this page
  data() {
    return {
      userType: "admin",
      registration: {
        rating: 0,
      },
      allSpecialities: [
        
      ],
      currentSpecialities: [
        {
          id: 0,
          receive_date: "",
        },
      ],
      rules: {
        login: [
          {
            required: true,
            message: "Введите ваш логин",
            trigger: "blur",
          },
        ],
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
        email: [
          {
            required: true,
            message: "Введите ваш e-mail",
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
      },
    };
  },
  async created() {
    this.allSpecialities = await doctorAPI
      .getSpecialities()
      .then((response) => {
        return response.data;
      });
  },
  methods: {
    async onSubmit() {
      const regData = this.registration;
      if (this.userType === "admin") {
        const data = {
          login: regData.login,
          password: regData.password,
          email: regData.email,
        };
        await adminAPI.postAdmin(data);
      } else if (this.userType === "doctor") {
        await adminAPI.postDoctor(regData);
        const doctors = await doctorAPI.getDoctors().then((response) => {
          return response.data;
        });
        const currentDoctor = await doctors.find(
          (item) => item.login === regData.login
        );
        for await (let speciality of this.currentSpecialities) {
          console.log(speciality);
          await doctorAPI.postSpecialityByDoctorId(
            currentDoctor.id,
            speciality
          );
        }
      }
    },
    addSpeciality() {
      this.currentSpecialities.push({
        id: 0,
        receive_date: "",
      });
    },
    removeSpeciality() {
      this.currentSpecialities.pop("");
    },
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