import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import authService from "../services/auth.service";

const DashboardLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="DashboardLayout h-screen  flex">
            <Sidebar />
            <div className="flex-1 overflow-auto max-h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;