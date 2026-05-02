import { NavLink } from 'react-router-dom';

export const SidebarLink = ({ icon: Icon, title, to }) => {
    return (
        <NavLink
          to={to}
          className={({ isActive }) =>
            `link flex items-center gap-4 px-3 py-2 rounded-xl transition-colors duration-200 ${isActive ? 'bg-white/15 text-orangeClair' : 'text-white hover:bg-white/10'}`
          }
        >
            {Icon && <Icon className="icon text-white" size={20} />}
            <h2 className="text-white text-base font-medium">{title}</h2>
        </NavLink>
    )
}
