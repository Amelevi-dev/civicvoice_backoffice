import { Sidebar } from "../components/Sidebar"
import { Engagements } from "../pages/engagements/Engagement"



export const DashboardLayout = ()=>{
    return(
        <div className="DashboardLayout h-screen flex">
            <Sidebar/>
            <Engagements/>
        </div>
    )
}