import instance from "./InternetService.ts";

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

const register = async (data: SignUpReq): Promise<ResponseData> => {
  try {
    const response = await instance.post("/api/v1/user/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (data: LoginReq): Promise<ResponseData> => {
  try {
    const response = await instance.post("/api/v1/user/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { register, login };
