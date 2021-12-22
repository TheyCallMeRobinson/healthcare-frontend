<template>
  <div class="profile">
    <div class="profile__avatar">
      <el-avatar shape="circle" :size="175" :fit="fit">
        <img :src="src" alt="avatar" />
      </el-avatar>
      <h4>Admin</h4>
      <p><span>Email:</span> {{ adminProfile.email }}</p>
    </div>
    <el-tabs class="profile__tabs" v-model="activeName">
      <el-tab-pane class="profile__tab" label="Регистрация" name="first">
        <AdminRegistration />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

import AdminRegistration from "./AdminRegistration.vue";

export default defineComponent({
  data() {
    return {
      activeName: "first",
      src: require("../../assets/img/patient-avatar.png"),
      fit: "cover",
    };
  },
  components: {
    AdminRegistration,
  },
  methods: {
    ...mapActions(["updateAdminProfile"]),
  },
  created() {
    this.updateAdminProfile(this.loginModule.id);
  },
  computed: {
    ...mapState(["adminProfile"]),
    ...mapState(["loginModule"]),
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