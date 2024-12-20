import { PostComment } from "./comment.model";

export interface Post {
  id: string;
  title: string;
  fullName: string;
  bannerUrl: string;
  content: string;
  createdAt: Date;
  comments: PostComment[];
}