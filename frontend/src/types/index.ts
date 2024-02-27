import { ObjectId } from 'mongodb';

export interface PostData {
  postId: string;
  name: string;
  profileImg: string;
  likes: number;
  content: {
    postImg: string;
    summary: string;
    comments: Comments[];
  }; 
  _id: ObjectId;
}

export interface Comments {
  id: string;
  text: string;
}
