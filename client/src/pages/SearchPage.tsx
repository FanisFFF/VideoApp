import { useLocation } from "react-router-dom";
import VideoCard from "@/components/VideoCard";
import { useSearchVideosQuery } from "@/api/videoApi";

function SearchPage(){
    const query = new URLSearchParams(useLocation().search);
    const searchTerm = query.get('q');
    if (!searchTerm) return <div>Invalid video search</div>;
    const {data:videos} = useSearchVideosQuery(searchTerm)
    if(!videos) return '...loading'
    return (
        <div className="">
            {videos.map(video=>
            <div >
                <VideoCard video={video}/>
            </div>
            )}
        </div>
    )
}
export default SearchPage;