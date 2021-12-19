import axios from "axios"

const apiClient = axios.create({
     baseURL: 'http://localhost:8080/api',
    //baseURL: 'http://servachok2021.ddns.net:8081/api',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
})

export const authAPI = {
    login(formData: any) {
        const data = new FormData();
        data.set('username', formData.username);
        data.set('password', formData.password);
        return apiClient.post('/user/login', data);
    },
    logout() {
        return apiClient.get('user/logout');
    }
}

export const patientAPI = {
    getPatientById(id: number) {
        return apiClient.get(`/patients/${id}`)
    },
    putPatientById(id: number, patientData: any) {
        return apiClient.put(`/patients/${id}`, patientData)
    },
    getPatientDiseases(id: number) {
        return apiClient.get(`/patients/${id}/diseases`)
    },
    getPatientAllergies(id: number) {
        return apiClient.get(`/patients/${id}/allergies`)
    },
    getVisitsByPatientId(patientId: number) {
        return apiClient.get(`/appointments?patientId=${patientId}`)
    },
    deleteVisitById(id: number) {
        console.log(id);
        return apiClient.delete(`/appointments/${id}`)
    },
    postPatient(data: any) {
        return apiClient.post('/patients', { ...data })
    },
}

export const doctorAPI = {
    getDoctors() {
        return apiClient.get(`/doctors`);
    },
    getDoctorById(id: number) {
        return apiClient.get(`/doctors/${id}`)
    },
    postSpecialityByDoctorId(doctorId: number, specialityData: any) {
        return apiClient.post(`/doctors/${doctorId}/specialities`, specialityData)
    },
    getSpecialities() {
        return apiClient.get('/specialities')
    },
    getSpecialitiesByDoctorId(doctorId: number) {
        return apiClient.get(`/doctors/${doctorId}/specialities`)
    }
}

export const adminAPI = {
    getAdminById(id: number) {
        return apiClient.get(`/admins/${id}`)
    },
    postAdmin(data: any) {
        return apiClient.post('/admins', { ...data })
    },
    postDoctor(data: any) {
        return apiClient.post('/doctors', { ...data })
    },
}

// const EventService = {
//     login(formData: any) {
//         const data = new FormData();
//         data.set('username', formData.username);
//         data.set('password', formData.password);
//         return apiClient.post('/user/login', data);
//     },
//     deleteSlot(dayId: number) {
//         return apiClient.delete(`/schedule/${dayId}`);
//     },
//     getPatientById(id: number) {
//         return apiClient.get(`/patients/${id}`)
//     },
//     putPatientById(id: number, patientData: any) {
//         return apiClient.put(`/patients/${id}`, patientData)
//     },
//     getPatientDiseases(id: number) {
//         return apiClient.get(`/patients/${id}/diseases`)
//     },
//     getPatientAllergies(id: number) {
//         return apiClient.get(`/patients/${id}/allergies`)
//     },
//     getVisitsByPatientId(patientId: number) {
//         return apiClient.get(`/appointments?patientId=${patientId}`)
//     },
//     deleteVisitById(id: number) {
//         console.log(id);
//         return apiClient.delete(`/appointments/${id}`)
//     },
//     getDoctors() {
//         return apiClient.get(`/doctors`);
//     },
//     getDoctorById(id: number) {
//         return apiClient.get(`/doctors/${id}`)
//     },
//     getAdminById(id: number) {
//         return apiClient.get(`/admins/${id}`)
//     },
//     postAdmin(data: any) {
//         return apiClient.post('/admins', { ...data })
//     },
//     postDoctor(data: any) {
//         return apiClient.post('/doctors', { ...data })
//     },
//     postPatient(data: any) {
//         return apiClient.post('/patients', { ...data })
//     },
//     postSpecialityByDoctorId(doctorId: number, specialityData: any) {
//         return apiClient.post(`/doctors/${doctorId}/specialities`, specialityData)
//     },
//     getSpecialities() {
//         return apiClient.get('/specialities')
//     },
//     getSpecialitiesByDoctorId(doctorId: number) {
//         return apiClient.get(`/doctors/${doctorId}/specialities`)
//     }

// }

// export default EventService