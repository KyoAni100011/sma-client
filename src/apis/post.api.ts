import instance from "./InternetService";

const createPost = async (data: any) => {
  try {
    const response = await instance.post("/api/v1/post/create", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPosts = async () => {
  try {
    const response = await instance.get(`/api/v1/post`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPostById = async (postId: string) => {
  try {
    const response = await instance.get(`/api/v1/post/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updatePost = async (postId: string, data: any) => {
  try {
    const response = await instance.put(`/api/v1/post/update/${postId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deletePost = async (postId: string) => {
  try {
    const response = await instance.delete(`/api/v1/post/delete/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { createPost, getPosts, getPostById, updatePost, deletePost };
