export interface PostData {
  name: string;
  profileImg: string;
  content: {
    postImg: string;
    summary: string;
    comments: Comments[];
  };
}

export interface Comments {
  id: string;
  text: string;
}
