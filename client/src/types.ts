export type Video = {
    id: number;
    title: string;
    description: string;
    video_path: string;
    thumbnail_path?:string;
    liked_by_user:boolean;
    likes_count:number;
    comments:Comment[];
  };
export type Comment = {
  id:number;
  user:User;
  text:string;
}
export type User = {
  id:number;
  name:string;
  email:string;
}