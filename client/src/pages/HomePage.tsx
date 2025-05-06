import Loader from "@/components/Loader";
import VideoCard from "../components/VideoCard";
import { useGetAllVideosQuery } from "@/api/videoApi";

const HomePage = () => {
      const {
            data: videos,
            isLoading,
        } = useGetAllVideosQuery('');

  if(isLoading) return <Loader/>
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {videos?.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>)
}
export default HomePage;