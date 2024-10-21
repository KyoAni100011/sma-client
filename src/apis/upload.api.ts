import { apiClient } from "./InternetService";

const UPLOAD_PATHS = {
  IMAGE: "/api/v1/upload/image",
  VIDEO: "/api/v1/upload/video",
  DELETE_IMAGE: "/api/v1/upload/delete/image",
  DELETE_VIDEO: "/api/v1/upload/delete/video",
};

const uploadImage = async (formData: FormData) => {
  const response = await apiClient.post(UPLOAD_PATHS.IMAGE, formData);
  return response.data;
};

const uploadVideo = async (formData: FormData) => {
  const response = await apiClient.post(UPLOAD_PATHS.VIDEO, formData);
  return response.data;
};

const deleteImage = async (public_id: string) => {
  const response = await apiClient.delete(`${UPLOAD_PATHS.DELETE_IMAGE}/${public_id}`);
  return response.data;
};

const deleteVideo = async (public_id: string) => {
  const response = await apiClient.delete(`${UPLOAD_PATHS.DELETE_VIDEO}/${public_id}`);
  return response.data;
};


export { uploadImage, uploadVideo, deleteImage, deleteVideo };
