import { Outlet, useLocation } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { AnimatePresence } from "framer-motion"

const DashboardLayout = ()=>{
    const location = useLocation();

    return(
        <div className="DashboardLayout h-screen flex">
            <Sidebar/>
            <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                    <Outlet key={location.pathname} />
                </AnimatePresence>
            </div>
        </div>
    )
}

export default DashboardLayout;