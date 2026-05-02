import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"

const DashboardLayout = ()=>{
    return(
        <div className="DashboardLayout h-screen flex">
            <Sidebar/>
            <div className="flex-1 overflow-hidden">
              <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout;