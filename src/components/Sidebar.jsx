import { FaPlusCircle, FaArchive, FaCog, FaSignOutAlt, FaHome, FaLink } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import { SidebarLink } from './SidebarLink';
import { FaChartColumn, FaShield } from 'react-icons/fa6';
import { useState, useEffect } from 'react';

export const Sidebar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (e) {
                console.error('Erreur parsing user:', e);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <div className="Sidebar w-[20%] h-full bg-bleuFonce border-none flex flex-col">
            <div className="hearder h-[15%] flex items-center justify-center gap-4 mb-2 p-3.5">
                <div className="logo h-14 w-14 bg-white rounded-full flex items-center justify-center"><img src={logo} className="logo" alt="Logo" /></div>
                <h1 className="title font-bold text-3xl text-white">Civic<span className='text-orangeClair'>Voice</span></h1>
            </div>
            <div className="user-info px-3.5 py-3 border-b border-white border-opacity-20">
                <p className="text-white text-sm font-semibold truncate">
                    {user?.name || 'Utilisateur'}
                </p>
                <p className="text-white text-xs opacity-75 capitalize truncate">
                    {user?.arrondissement || 'Arrondissement inconnu'}
                </p>
            </div>
            <div className="menu px-3 py-4 w-full flex flex-col justify-center items-start gap-3 flex-1">
                <SidebarLink to="/" icon={FaHome} title="Dashboard" />
                <SidebarLink to="/consultations/create" icon={FaPlusCircle} title="Créer Consultation" />
                <SidebarLink to="/consultations/stats" icon={FaChartColumn} title="Consultations" />
                <SidebarLink to="/votes" icon={FaChartColumn} title="Votes" />
                <SidebarLink to="/engagements" icon={FaShield} title="Engagements" />
                <SidebarLink to="/consultations/archives" icon={FaArchive} title="Archives" />
                <SidebarLink to="/blockchain" icon={FaLink} title="Blockchain Ledger" />
                {/* <SidebarLink to="/settings" icon={FaCog} title="Paramètres" /> */}
            </div>
            <div className="logout  w-full">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-1 ml-3.5 text-white hover:text-orangeClair duration-300 transition-colors"
                >
                    <FaSignOutAlt />
                    <span>Déconnexion</span>
                </button>
            </div>
        </div>
    );
};