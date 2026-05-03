import authService from "../services/auth.service";

export const Navbar = ({title, description})=>{
    const user = authService.getCurrentUser();
    
    return(
        <div className="Navbar h-auto w-full mx-6 py-5 gap-2 flex flex-col justify-start">
            <div className="flex justify-between items-center w-full pr-12">
                <div>
                    <h1 className="text-3xl font-bold text-bleuFonce">{title}</h1>
                    <p className="text-lg font-light text-black/50">
                        {description} {user?.arrondissement ? `— ${user.arrondissement}` : ''}
                    </p>
                </div>
            </div>
        </div>
    )
}