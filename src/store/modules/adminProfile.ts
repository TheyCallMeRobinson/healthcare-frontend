import { adminAPI } from '@/api/EventService';
import Admin from '@/models/admin.model';

const adminProfile = {
	state: () => ({
		id: 0,
		login: "",
		email: "",
	} as Admin),
	mutations: {
		UPDATE_ADMIN_PROFILE(state: any, payload: any) {
			state.id = payload.id;
			state.login = payload.login;
			state.email = payload.email;
		}
	},
	actions: {
		updateAdminProfile(context: any, id: number) {
			adminAPI.getAdminById(id)
				.then((response: any) => {
					// invokes mutation
					context.commit('UPDATE_ADMIN_PROFILE', response.data);
				})
				.catch((error: any) => {
					console.log(error);
				})
		},
	}

}

export default adminProfile;