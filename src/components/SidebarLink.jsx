export const SidebarLink = ({ icon: Icon, title }) => {
    return (
        <div className="link flex justify-center items-center gap-4 focus:p-2 focus:bg-bleuFonce/35">
            {Icon && <Icon className="icon text-white" size={20}   />}
            <h2 className="text-white hover:text-orangeClair transition-colors duration-200 ">{title}</h2>
        </div>
    )
}
