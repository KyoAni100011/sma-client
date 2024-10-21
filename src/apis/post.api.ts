import { createEntity, getEntityById, updateEntity, deleteEntity, getAllEntities } from "./InternetService";

const createPost = (data: any) => createEntity('post', data);
const getPosts = () => getAllEntities('post');
const getPostById = (postId: string) => getEntityById('post', postId);
const updatePost = (postId: string, data: any) => updateEntity('post', postId, data);
const deleteCurrPost = (postId: number) => deleteEntity('post', postId);

export { createPost, getPosts, getPostById, updatePost, deleteCurrPost };
