import { apiClient } from "./InternetService.ts";

interface SignUpReq {
  name: string;
  email: string;
  password: string;
}

interface LoginReq {
  email: string;
  password: string;
}

interface ResponseData {
  message: string;
  data?: Record<string, any>;
}

const API_ENDPOINTS = {
  REGISTER: "/api/v1/user/register",
  LOGIN: "/api/v1/user/login",
};

const register = async (data: SignUpReq): Promise<ResponseData> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (data: LoginReq): Promise<ResponseData> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { register, login };
