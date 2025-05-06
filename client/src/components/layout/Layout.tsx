import { Outlet } from "react-router-dom";

import Header from "../Header";

const MainLayout = ()=>{
    return (
        <div className="">
            <Header/>
            <main className="flex-1 container mx-auto max-w-5xl p-4">
                <Outlet/>
            </main>
        </div>
    )
}
export default MainLayout;
