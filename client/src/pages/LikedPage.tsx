import { useGetLikedVideosQuery } from "@/api/videoApi";
import VideoCard from "@/components/VideoCard";
export default function LikedPage() {
    const { data: videos } = useGetLikedVideosQuery('');
    return (
        <div>
            <h2 className="mb-4 font-bold">Liked Videos</h2>
            {videos?.map(video => <VideoCard key={video.id} video={video} />)}
        </div>
    )
}