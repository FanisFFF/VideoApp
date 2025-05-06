import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();
    function handleSubmit(e:FormEvent) {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(search)}`)
    }
    return (
        <form onSubmit={handleSubmit} className="relative">
            <Input onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} className="w-32 sm:w-sm md:w-md " placeholder="Search video"></Input>
            <Search className="absolute top-1.5 right-2.5" />
        </form>)
}
export default SearchBar;