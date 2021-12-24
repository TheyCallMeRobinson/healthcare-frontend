import { authAPI } from '@/api/EventService';
import router from '@/router';

const loginModule = {
  state: () => ({
    id: 0,
    login: "",
    email: "",
    role: "",
    formData: {
      username: "",
      password: ""
    },
    error: ""
  }),
  mutations: {
    // actions are not synchronized mutations yes
    SET_LOGIN(state: any, value: any) {
      state.formData = value;
    },
    SET_ERROR(state: any, value: any) {
      state.error = value;
    },
    SET_USER_DATA(state: any, value: any) {
      state.id = value.id;
      state.login = value.login;
      state.email = value.email;
      state.role = value.role;
    },
    CLEAR_FORM(state: any) {
      state.formData.username = "";
      state.formData.password = "";
    }
  },
  actions: {
    login(context: any) {
      context.commit('SET_ERROR', '');
      authAPI.login(context.state.formData)
        .then((response: any) => {
          context.commit('CLEAR_FORM');
          context.commit('SET_USER_DATA', response.data);
          router.push('/portal');
        })
        .catch((error: any) => {
          context.commit('SET_ERROR', error);
        })
    }
  }
};

export default loginModule;