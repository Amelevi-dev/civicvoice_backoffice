import { FaPlusCircle, FaShieldAlt } from 'react-icons/fa'
import logo from '../assets/images/logo.png'
import { SidebarLink } from './SidebarLink'
import { FaChartColumn, FaShield } from 'react-icons/fa6'

export const Sidebar = () => {
    return (

        <div className="Sidebar w-[20%] h-full bg-bleuFonce border-none">
            <div className="hearder h-[20%] flex items-center justify-center gap-4 border-b border-2 border-b-white mb-3.5 ">
                <div className="logo h-14 w-14 bg-white rounded-full flex items-center justify-center"><img src={logo} className="logo" alt="Logo" /></div>
                <h1 className="title font-bold text-3xl text-white">Civic<span className='text-orangeClair'>Voice</span></h1>
            </div>
            <div className="menu px-3.5 py-4 w-full flex flex-col justify-center items-start gap-5">
                <SidebarLink icon={FaPlusCircle} title="Créer une consultation" />
                <SidebarLink icon={FaChartColumn} title="Votes en cours" />
                <SidebarLink icon={FaShield} title="Engagements" />
            </div>
        </div>
    )
}