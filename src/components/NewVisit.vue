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
    <!--
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
    -->
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
    <template v-if="chosenDoctor">
      <el-form-item label="Дата и время" required>
        <el-form-item prop="date1">
          <el-form-item label="Выберите дату" prop="time">
            <el-select @change="dateChangeHandler" v-model="pickedDate" placeholder="Дата">
              <el-option
                  v-for="date in datesAvailable"
                  :key="date"
                  :value="date"
                  :label="date">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item v-if="pickedDate" prop="date2">
          <el-form-item label="Теперь время" prop="time">
            <el-select v-model="chosenTime" placeholder="Время">
              <el-option
                  v-for="time in timeAvailable"
                  :key="time"
                  :value="time"
                  :label="time">
              </el-option>
            </el-select>
          </el-form-item>
          <!--
          <el-time-picker
              placeholder="Выберите время"
              style="width: 100%"
          ></el-time-picker> !-->
        </el-form-item>
      </el-form-item>
    </template>
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
        speciality: "",
        date: "",
        time: ""
      },
      specialities: [],
      doctors: [],
      datesAvailable: [],
      timeAvailable: [],
      datesAndTime: [],
      chosenSpec: "",
      chosenDoctor: "",
      specialities_pulled: [],
      pickedDate: "",
      chosenTime: "",
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
        onSubmit() {
          //patientAPI.postVisit(this.visitForm);
          this.visitForm = [this.chosenDoctor.id, this.chosenDoctor.specialities[0], this.pickedDate];
          doctorAPI.postVisit(this.visitForm);
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
          doctorAPI.getFreeVisitsByDoctorId(event.id).then((response) => {
            this.datesAndTime = response.data;
            console.log(response.data);
            this.datesAvailable = response.data.map((date) => {
              return date.date;
            })

          })
        },
        dateChangeHandler(event) {
          const pickedDate = event;
          this.timeAvailable = this.datesAndTime.find((date)=>{
            return date.date === pickedDate;
          }).freeTime;
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