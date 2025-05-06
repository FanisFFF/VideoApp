import { Outlet } from "react-router-dom";

const AuthLayout = ()=>{
    return(
        <main className="min-h-screen flex bg-gray-50  items-center justify-center">
            <Outlet/>
        </main>
    )
}
export default AuthLayout