<template>
  <el-form
      label-width="120px"
      ref="visitForm"
      :model="visitForm"
      label-position="left"
      size="medium"
      class="form"
  >

    <h2>Создание новой записи</h2>
    <el-form-item label="Специальность" prop="specialty">
      <el-select v-model="chosenSpec" placeholder="Специальность">
        <el-option
            v-for="spec in specialities"
            :key="spec.id"
            :value="spec.id"
            :label="spec.name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Дата и время" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
              v-model="pickedDate"
              type="date"
              placeholder="Выберите дату"
              style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker
              placeholder="Выберите время"
              style="width: 100%"
          ></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label="Врач" prop="doctors" required>
      <el-select v-model="chosenDoctor" placeholder="Выберите врача" @change="docPicked">
        <el-option
            v-for="doctor in doctors"
            :key="doctor.id"
            :label="`${doctor.first_name} ${doctor.mid_name} ${doctor.last_name}`"
            :value="doctor">
          <!--            :label="`${doctor.first_name} ${doctor.mid_name} ${doctor.last_name}`"-->
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Подтвердить</el-button>
    </el-form-item>
    <!-- <ul>
      <li v-for="doctor in visitForm.doctors" :key="doctor">{{ doctor }}</li>
    </ul> -->
  </el-form>
</template>

<script>
import {doctorAPI, patientAPI} from "@/api/EventService";
import {defineComponent, reactive, toRefs} from "vue";

export default defineComponent({
  data() {
    return {
      item: {},
      visitForm: {
        doctor: "",
        speciality:"",
        date:"",
        time:""
      },
      specialities: [],
      doctors: [],
      chosenSpec: "",
      chosenDoctor: "",
      specialities_pulled: [],
      pickedDate:""
    };
  },
  async created() {
    const specialities = await doctorAPI.getSpecialities().then((response) => {
      return response.data;
    });
    this.specialities = specialities;
    this.specialities_pulled = specialities;
    const doctors = await doctorAPI.getDoctors().then((response) => {
      return response.data;
    });
    this.doctors = doctors;
    const state = reactive({
      disabledDate(time) {
        return time.getTime() > Date.now()
      },
    })

    return {
      ...toRefs(state),
    }
  },

  methods:
      {
        sendComment() {
          //patientAPI.postVisit(this.visitForm);
          this.visitForm = [this.chosenDoctor.id, this.chosenSpec, this.pickedDate];
          console.log(this.visitForm);
        }
        ,
        docPicked(event) {
          doctorAPI.getSpecialitiesByDoctorId(event.id).then((response) => {
            this.specialities = response.data.map((element) => {
              return this.specialities_pulled.find(eeee => {
                return eeee.id === element.id;
              });
            })
          });
        }
      }
  ,
})
;
</script>

<style lang="css" scoped>
.form {
  max-width: 500px;
  padding: 0 50px;
}

@media (max-width: 576px) {
  .form {
    padding: 0 10px;
  }
}
</style>