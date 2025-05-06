import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetVideoQuery, usePostCommentMutation, useToggleLikeMutation } from "@/api/videoApi";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/Loader";



const WatchPage = () => {
    const { id } = useParams<{ id: string }>();
    const [newComment, setNewComment] = useState('');
    if (!id) return <div>Invalid video ID</div>;
    const {
        data: video,
        isLoading,
        refetch,
    } = useGetVideoQuery(id!, { refetchOnMountOrArgChange: true });

    const [toggleLike] = useToggleLikeMutation();
    const [postComment] = usePostCommentMutation();
    const { isAuthenticated } = useAuth()
    if (isLoading || !video) {
        return <Loader/>
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await postComment({ videoId: id!, text: newComment });
        setNewComment('');
    };

    const handleLike = async () => {
        try {
            const result = await toggleLike(id!).unwrap();
            console.log("Liked?", result.liked);
            refetch();
        } catch (error) {
            console.error("Like error:", error);
        }
    };
    return (
        <>
            <div className="p-8">
                <video controls className="w-full max-w-4xl mx-auto rounded shadow">
                    <source src={`${import.meta.env.VITE_STORAGE_URL}/${video.video_path}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
                <p className="text-gray-600 mt-2">{video.description}</p>
            </div>
            <div className="flex mb-8 justify-center items-center">
                <span className="mr-4">Likes {video.likes_count}</span>
                {isAuthenticated &&
                    <Button onClick={handleLike}>{video.liked_by_user ? "Unlike" : "Like"}</Button>
                }
            </div>
            {isAuthenticated &&
                <div className="mb-20">
                    <form onSubmit={handleSubmit} className="flex max-w-md">
                        <Input className="w-full" onChange={(e) => setNewComment(e.target.value)} value={newComment} name="text" id="text" />
                        <Button className="self-end" type="submit">Post</Button>
                    </form>
                </div>
            }
            {video.comments?.map((comment) => (
                <div className="text-left mb-8" key={comment.id}>
                    <span className="font-bold">{comment.user.name}</span>
                    <h2>{comment.text}</h2>
                </div>
            ))}
        </>
    );
};

export default WatchPage;