// Create a basic Axios instance pointing to our Spring Boot server
import axios from "axios";
import {data} from "react-router-dom";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

// We map out our backend endpoints here

// ---- USER ENDPOINTS ----
export const registerUser = (userData) => apiClient.post("/users/register", userData)

// ---- DEPARTMENT ENDPOINTS ----
export const createDepartment = (departmentData) => apiClient.post("/departments/create", departmentData)
export const getAllDepartments = () => apiClient.get("/departments/all")

// ---- COMPLAINT ENDPOINTS ----
export const submitComplaint = (complaintData) => apiClient.post("/complaints/submit", complaintData)
// GET methods for different dashboard views
export const getAllComplaints = () => apiClient.get("/complaints/all")
export const getCitizenComplaints = (citizenId) => apiClient.get(`/complaints/citizen/${citizenId}`)
export const getDepartmentComplaints = (departmentId) => apiClient.get(`/complaints/department/${departmentId}`)
// PATCH method for updating complaint status
export const updateComplaintStatus = (id, status) => apiClient.patch(`/complaints/${id}/status`, {status})

export default apiClient;