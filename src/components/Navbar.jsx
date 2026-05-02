export const Navbar = ({title, description})=>{
    return(
        <div className="Navbar h-[15%] w-full mx-6 py-5 gap-3.5 flex flex-col justify-start">
            <h1 className="text-3xl font-semibold text-bleuFonce">{title}</h1>
            <p className="text-lg font-light text-black/50">{description}</p>
        </div>
    )
}