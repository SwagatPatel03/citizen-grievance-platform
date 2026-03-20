import {useEffect, useState} from "react";
import {getAllComplaints} from "../services/api.jsx";

const AdminDashboard = () => {
    const [complaints, setComplaints] = useState([])
    const [loafing, setLoading] = useState(true)

    useEffect(() => {

    }, []);

    const fetchAllData = async () => {
        try {
            const response = await getAllComplaints()
            setComplaints(response.data)
        } catch (error) {
            console.error("Failed to fetch all complaints", error)
        } finally {
            setLoading(false)
        }
    }
}