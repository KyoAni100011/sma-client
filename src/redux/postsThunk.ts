import { AppThunk } from './store';
import { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure, addPost, Post, deletePost } from './postsSlice';
import { getPosts, createPost, deleteCurrPost } from '../apis/post.api';

export const fetchPosts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchPostsStart());
    const response = await getPosts(); 
    dispatch(fetchPostsSuccess(response ?? [])); 
  } catch (error: any) {
    dispatch(fetchPostsFailure(error.message));
  }
};

export const createNewPost = (newPost: Post): AppThunk => async (dispatch) => {
  try {
    const response = await createPost(newPost);
    dispatch(addPost(response ?? null)); 
  } catch (error) {
    console.error('Failed to create post', error);
  }
};

export const removePost = (postId: number): AppThunk => async (dispatch) => {
  try {
    await deleteCurrPost(postId); 
    dispatch(deletePost(postId)); 
  } catch (error) {
    console.error('Failed to delete post', error);
  }
};
