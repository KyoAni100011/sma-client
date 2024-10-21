import { RootState } from './store';

export const selectAllPosts = (state: RootState) => state.posts.list;
export const selectPostById = (state: RootState, postId: number) => 
  state.posts.list.find(post => post.id === postId);
export const selectLoadingState = (state: RootState) => state.posts.loading;
export const selectError = (state: RootState) => state.posts.error;
