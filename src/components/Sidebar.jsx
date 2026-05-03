import { FaPlusCircle, FaLink, FaThLarge, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import { SidebarLink } from './SidebarLink';
import { FaChartColumn, FaShield } from 'react-icons/fa6';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div className="Sidebar w-[20%] h-full bg-bleuFonce border-none flex flex-col">
            <div className="hearder h-[18%] flex flex-col items-center justify-center gap-2 border-b border-white/10 mb-3.5 ">
                <div className="flex items-center gap-3">
                    <div className="logo h-10 w-10 bg-white rounded-full flex items-center justify-center p-1"><img src={logo} className="w-full h-full object-contain" alt="Logo" /></div>
                    <h1 className="title font-bold text-2xl text-white">Civic<span className='text-orangeClair'>Voice</span></h1>
                </div>
                {user && (
                    <div className="flex flex-col items-center mt-2">
                        <p className="text-white text-sm font-semibold">{user.name}</p>
                        <div className="flex flex-col items-center gap-1 mt-1">
                            <span className="bg-orangeClair/20 text-orangeClair text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold border border-orangeClair/30">
                                {user.role}
                            </span>
                            {user.arrondissement && (
                                <span className="text-white/50 text-[10px] font-medium text-center px-4">
                                    {user.arrondissement}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="menu px-3.5 py-4 w-full flex flex-col justify-start items-start gap-3 flex-1 overflow-y-auto">
                <SidebarLink to="/" icon={FaThLarge} title="Observatoire" />
                
                {user?.role === 'authority' && (
                    <>
                        <SidebarLink to="/consultations/create" icon={FaPlusCircle} title="Lancer une Consultation" />
                        <SidebarLink to="/engagements" icon={FaShield} title="Pactes de Redevabilité" />
                    </>
                )}

                <SidebarLink to="/votes" icon={FaChartColumn} title="Volonté Populaire" />
                <SidebarLink to="/ledger" icon={FaLink} title="Archives de la Souveraineté" />
                <SidebarLink to="/audit" icon={FaSearch} title="Rapports d'Audit" />
            </div>
            
            <div className="p-4 border-t border-white/10 bg-black/10">
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-4 py-3 w-full text-white hover:bg-red-500 rounded-xl transition-all duration-200 group shadow-md"
                >
                    <FaSignOutAlt size={20} />
                    <span className="font-bold">Déconnexion</span>
                </button>
            </div>
        </div>
    );
};