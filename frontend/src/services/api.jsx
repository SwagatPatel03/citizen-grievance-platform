// Create a basic Axios instance pointing to our Spring Boot server
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// The Axios Interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Look for the token in the browser's local Storage
        const token = localStorage.getItem('jwt_token');
        if(token) {
            // If found, attach it as a Bearer token
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// We map out our backend endpoints here

// ---- USER ENDPOINTS ----
export const registerUser = (userData) => apiClient.post("/users/register", userData)
export const loginUser = (credentials) => apiClient.post("/users/login", credentials)

// ---- ADMIN ENDPOINTS ----
export const createDepartment = (departmentData) => apiClient.post("/admin/departments", departmentData)
export const getAllDepartments = () => apiClient.get("/admin/departments")
export const registerOfficer = (officerData) => apiClient.post("/admin/officers", officerData)

// ---- COMPLAINT ENDPOINTS ----
export const submitComplaint = (complaintData) => apiClient.post("/complaints/submit", complaintData)
// GET methods for different dashboard views
export const getAllComplaints = () => apiClient.get("/complaints/all")
export const getCitizenComplaints = (citizenId) => apiClient.get(`/complaints/citizen/${citizenId}`)
export const getDepartmentComplaints = (departmentId) => apiClient.get(`/complaints/department/${departmentId}`)
// PATCH method for updating complaint status
export const updateComplaintStatus = (id, status) => apiClient.patch(`/complaints/${id}/status`, {status})

// ---- AI CHAT ENDPOINTS ----
export const askLokMitra = (message) => apiClient.post('/chat', { message });

// ---- COMMUNITY POST ENDPOINTS ----
// Fetch the live community feed
export const getCommunityFeed = (ward) => apiClient.get(`/community/feed?ward=${ward}`);
// Submit a poll vote
export const submitPollVote = (optionId) => apiClient.post(`/community/poll/vote/${optionId}`);
// Publish a new post to the community feed
export const createCommunityPost = (postData) => apiClient.post('/community/create', postData);

export default apiClient;