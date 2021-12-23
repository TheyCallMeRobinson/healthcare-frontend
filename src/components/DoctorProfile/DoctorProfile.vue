<template>
  <div class="profile">
    <div class="profile__avatar">
      <el-avatar shape="circle" :size="175" :fit="fit">
        <img :src="src" alt="avatar" />
      </el-avatar>
      <h4>
        {{ doctorName }}
      </h4>
      <p><span>Email:</span> {{ doctorProfile.email }}</p>
      <p>
        <span>Рейтинг:</span> {{ doctorProfile.rating }}
        <el-rate
          style="display: inline"
          v-model="doctorProfile.rating"
          disabled
        >
        </el-rate>
      </p>
      <h5>Специальности:</h5>
      <p v-for="specitality in specialities" :key="specitality.id">
        {{ specitality.name }} c
        {{ specitality.receive_date }}
      </p>
    </div>
    <el-tabs class="profile__tabs" v-model="activeName">
      <el-tab-pane class="profile__tab flex" label="Расписание" name="first">
        <Schedule :doctorProfile="doctorProfile" ref="schedule" />
      </el-tab-pane>
      <el-tab-pane label="Результаты осмотра" name="second">
        <Report />
      </el-tab-pane>
      <el-tab-pane
        class="profile__tab flex"
        label="Настройка расписания"
        name="third"
      >
        <ScheduleSettings
          :doctorProfile="doctorProfile"
          @update-weekends="updateSchedule"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions, mapGetters } from "vuex";

import Schedule from "./Schedule.vue";
import ScheduleSettings from "./ScheduleSettings.vue";
import Report from "./Reports.vue";
import { doctorAPI } from "@/api/EventService";
import Speciality from "@/models/speciality.model";

export default defineComponent({
  async created() {
    this.updateDoctorProfile(this.loginModule.id);
    this.specialities = await doctorAPI
      .getSpecialitiesByDoctorId(this.loginModule.id)
      .then((responce) => {
        return responce.data;
      });
    const allSpecialities = await doctorAPI
      .getSpecialities()
      .then((response) => {
        return response.data;
      });

    for (let i = 0; i < this.specialities.length; i++) {
      this.specialities[i].name = allSpecialities.find(
        (item: any) => item.id == this.specialities[i].id
      ).name;
    }
  },
  data() {
    return {
      activeName: "first",
      src: require("../../assets/img/patient-avatar.png"),
      fit: "cover",
      specialities: [] as Speciality[],
    };
  },
  components: {
    Schedule,
    Report,
    ScheduleSettings,
  },
  computed: {
    ...mapState(["doctorProfile"]),
    ...mapGetters(["doctorName"]),
    ...mapState(["loginModule"]),
  },
  methods: {
    ...mapActions(["updateDoctorProfile"]),
    updateSchedule() {
      (this.$refs.schedule as any).cutWeekends();
      console.log("updated");
    },
  },
});
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 90vh;
  min-height: calc(100vh - 110px);
}

.profile__avatar {
  flex: 1 0 20%;
  text-align: center;
  border-right: 2px solid #e4e7ed;
  margin-right: 30px;
  padding-right: 10px;
}
.profile__tabs {
  flex: 0 1 80%;
}
.flex {
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
}
p {
  text-align: left;
}
p span {
  font-weight: bold;
  padding-right: 5px;
}
@media (max-width: 576px) {
  .profile {
    flex-direction: column;
  }
  .profile__avatar {
    flex: 0 0 100%;
    margin-right: 0;
    margin-bottom: 2px solid #e4e7ed;
  }
  .profile__tabs {
    flex: 0 0 100%;
  }
}
</style>