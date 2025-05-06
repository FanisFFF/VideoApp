import { FC, useRef, useState } from "react";
import { Video } from "../types";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  video: Video;
};

const VideoCard: FC<Props> = ({ video }) => {
  const STORAGE_PATH = import.meta.env.VITE_STORAGE_URL;
  const { title, description, video_path, thumbnail_path } = video;
  const fullVideoPath = `${STORAGE_PATH}/${video_path}`;
  const thumbnailUrl = thumbnail_path
    ? `${STORAGE_PATH}/${thumbnail_path}`
    : undefined;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return (
    <Link to={`/${video.id}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-video overflow-hidden rounded-lg bg-black"
          >
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt={title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  hovered ? "opacity-0" : "opacity-100"
                }`}
              />
            )}

            <video
              muted
              ref={videoRef}
              className="w-full h-full object-cover"
            >
              <source src={fullVideoPath} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VideoCard;
