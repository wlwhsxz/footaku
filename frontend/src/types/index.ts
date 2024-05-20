import { ObjectId } from "mongodb";

export interface NewComment {
  _id: ObjectId;
  postId: string;
  userId: string;
  text: string;
  userName: string;
  profileImg: string;
  updatedAt: Date;
  createdAt: Date;
  createdBy: {
    userId: string;
    profileImg: string;
  };
  likes: string[];
  newlyAdded?: boolean;
}

export interface PostContent {
  postImg: string;
  summary: string;
  comments: NewComment[];
}

export interface PostType {
  _id: ObjectId;
  postId: string;
  name: string;
  profileImg: string;
  postURL: string;
  likes: string[];
  content: PostContent;
  publishedAt: Date;
}

export interface PostData {
  posts: PostType[];
}
