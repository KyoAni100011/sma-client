import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  username: string;
  avatarUrl?: string;
}

interface Comment {
  id: number;
  content: string;
  imgUrl?: string;
  imgName?: string;
  videoUrl?: string;
  videoName?: string;
  userId: number;
  user: User;
  postId: number;
  parentCommentId?: number;
  createdAt: string;
}

export interface Post {
  id?: number;
  content: string;
  imgUrl?: string;
  imgName?: string;
  videoUrl?: string;
  videoName?: string;
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  createdAt?: string;
  userId?: number;
  user?: User;
  comments?: Comment[];
}

interface PostsState {
  list: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  list: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchPostsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.list.unshift(action.payload);
    },
    updatePost(state, action: PayloadAction<Post>) {
      const index = state.list.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deletePost(state, action: PayloadAction<number>) {
      state.list = state.list.filter(post => post.id !== action.payload);
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPost,
  updatePost,
  deletePost,
} = postsSlice.actions;

export default postsSlice.reducer;
