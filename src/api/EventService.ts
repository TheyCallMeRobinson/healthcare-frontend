import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
})

export default {
    getSchedule() {
        return apiClient.get('/schedule');
    },
    getPatientById(id: number) {
        return apiClient.get(`/patients/${id}`)
    },
    putPatientById(id: number, patientData: any) {
        return apiClient.put(`/patients/${id}`, patientData)
    }
}