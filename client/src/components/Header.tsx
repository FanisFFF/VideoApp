import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { Link, } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header() {
    const { isAuthenticated, logout, user } = useAuth();
    return (
        <header className="flex   justify-between items-center p-4 bg-gray-20 border-b shadow-sm mb-4" >
            <Link to='/'>
                <h1 className="text-xl font-bold">🎬 Video App</h1>
            </Link>
            <SearchBar></SearchBar>
            {isAuthenticated ? (
                <div>
                    <span className="font-bold mr-2">{user.name}</span>
                    <Button onClick={logout} variant="outline">Logout</Button>
                </div>
            ) : (
                <div className="space-x-2">
                    <Link to="/login">
                        <Button variant="outline">Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button>Register</Button>
                    </Link>
                </div>
            )}
        </header>

    )
}

export default Header;