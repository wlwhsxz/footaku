import { create } from "zustand";

interface LikeState {
  postLikes: Record<string, string[]>;
  commentLikes: Record<string, string[]>;
  clickedPost: Record<string, boolean>;
  clickedComment: Record<string, boolean>;
  updatePostLikes: (postId: string, newLikes: string[]) => void;
  updateCommentLikes: (commentId: string, newLikes: string[]) => void;
  setClickedPost: (postId: string, clicked: boolean) => void;
  setClickedComment: (commentId: string, clicked: boolean) => void;
}

export const useLikeStore = create<LikeState>((set) => ({
  postLikes: {},
  commentLikes: {},
  clickedPost: {},
  clickedComment: {},
  updatePostLikes: (postId, newLikes) =>
    set((state) => ({
      postLikes: {
        ...state.postLikes,
        [postId]: newLikes,
      },
    })),
  updateCommentLikes: (commentId, newLikes) =>
    set((state) => ({
      commentLikes: {
        ...state.commentLikes,
        [commentId]: newLikes,
      },
    })),
  setClickedPost: (postId, clicked) =>
    set((state) => ({
      clickedPost: {
        ...state.clickedPost,
        [postId]: clicked,
      },
    })),
  setClickedComment: (commentId, clicked) =>
    set((state) => ({
      clickedComment: {
        ...state.clickedComment,
        [commentId]: clicked,
      },
    })),
}));
