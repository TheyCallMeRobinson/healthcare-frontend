import axios from "axios"

const apiClient = axios.create({
    // baseURL: 'http://localhost:8080/api',
    baseURL: 'http://servachok2021.ddns.net:8081/api',
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
    postPatient(data: any) {
        return apiClient.post('/patients', {...data})
    },
    getPatientById(id: number) {
        return apiClient.get(`/patients/${id}`)
    },
    putPatientById(id: number, patientData: any) {
        return apiClient.put(`/patients/${id}`, {...patientData})
    },
    getPatientDiseases(id: number) {
        return apiClient.get(`/patients/${id}/diseases`)
    },
    getPatientAllergies(id: number) {
        return apiClient.get(`/patients/${id}/allergies`)
    },
    deleteVisitById(visitId: number) {
        return apiClient.delete(`/timerecord/${visitId}`);
    },
    getAllPlannedVisitsByPatientId(patientId: number) {
        return apiClient.get(`/timerecord/${patientId}/planned`);
    },
    getAllEndedVisitsByPatientId(patientId: number) {
        return apiClient.get(`/timerecord/${patientId}/ended`);
    },
    postComment(doctorId: number, commentData: any) {
        return apiClient.post(`/comments/${doctorId}`, {...commentData})
    },
    getCommentByDoctorID(doctorId: number) {
        return apiClient.get(`/comments/${doctorId}`)
    },
}

export const doctorAPI = {
    getDoctorById(id: number) {
        return apiClient.get(`/doctors/${id}`)
    },
    getDoctors() {
        return apiClient.get(`/doctors`);
    },
    postVisit(visitData: any) {
        return apiClient.post(`/timerecord`, {...visitData});
    },
    getLastVisitByDoctorId(doctorId: number) {
        return apiClient.get(`/timerecord/doctor/${doctorId}/date`);
    },
    getFreeVisitsByDoctorId(doctorId: number) {
        return apiClient.get(`/timerecord/doctor/${doctorId}/free`);
    },
    getBusyVisitsByDoctorId(doctorId: number) {
        return apiClient.get(`/timerecord/doctor/${doctorId}/busy`);
    },
    putVisit(visitId: number) {
        return apiClient.put(`/timerecord/${visitId}`);
    },
    // не помню что за url
    postReport(reportDate : any){
        return apiClient.post(`/`, {...reportDate});
    },
    postSpecialityByDoctorId(doctorId: number, specialityData: any) {
        return apiClient.post(`/doctors/${doctorId}/specialities`, {...specialityData})
    },
    getSpecialities() {
        return apiClient.get('/specialities')
    },
    getSpecialitiesByDoctorId(doctorId: number) {
        return apiClient.get(`/doctors/${doctorId}/specialities`)
    },
    getFreeVisitsByDate(date: any) {
        return apiClient.get(`/timerecord/${date}`);
    }
}

export const adminAPI = {
    postAdmin(data: any) {
        return apiClient.post('/admins', {...data})
    },
    getAdminById(id: number) {
        return apiClient.get(`/admins/${id}`)
    },
    postDoctor(data: any) {
        return apiClient.post('/doctors', {...data})
    },
    postAllergy(data: any) {
        return apiClient.post('/allergies', {...data})
    },
    getAllAllergies() {
        return apiClient.get('/allergies');
    }
}
