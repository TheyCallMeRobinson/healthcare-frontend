<template>
  <div class="menu-container">
    <el-menu
      mode="horizontal"
      class="main-menu"
      :router="routerMode"
      default-active="/portal/main-screen"
    >
      <el-menu-item index="/portal/main-screen"> Главная </el-menu-item>
      <el-menu-item index="/portal/profile"> Профиль </el-menu-item>
      <el-menu-item index="/portal/system-settings" v-if="userType === 'ADMIN'"> Настройки системы </el-menu-item>
      <el-menu-item
        index="/portal/new-visit"
        v-if="loginModule.role === 'PATIENT'"
      >
        Новая запись
      </el-menu-item>
    </el-menu>
    <el-button
      @click="logout"
      type="primary"
      round
      style="height: 40px; margin-top: 10px"
      >Выйти</el-button
    >
  </div>
</template>

<script>
import { authAPI } from "@/api/EventService";
import router from "@/router";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  data() {
    return {
      routerMode: true,
      userType: "",
    };
  },
  computed: {
    ...mapState(["loginModule"]),
  },
  async created() {
    this.userType = this.$store._state.data.loginModule.role;
    //console.log(this.$store, "тип пользователя ");
    // TODO: проверить работоспособность
  },
  methods: {
    logout() {
      authAPI.logout();
      router.push("/authorization/login");
    },
  },
});
</script>

<style scoped>
.main-menu {
  overflow: auto;
  display: flex;
  padding-right: 81px;
}

.menu-container {
  display: flex;
  justify-content: space-between;
}
</style>