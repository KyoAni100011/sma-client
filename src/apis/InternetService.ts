import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_LOCAL;
const API_BASE_PATH = "/api/v1";

const CRUD_ACTIONS = {
  CREATE: "/create",
  READ_ALL: "",
  READ_ONE: "/:id",
  UPDATE: "/update/:id",
  DELETE: "/delete/:id",
};

const apiClient = axios.create({
  baseURL: BACKEND_URL,
});

const executeApiCall = async (
  method: "get" | "post" | "put" | "delete",
  endpoint: string,
  payload?: any
) => {
  try {
    const response = await apiClient[method](endpoint, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createEntity = async (entityName: string, entityData: any) => {
  return executeApiCall(
    "post",
    `${API_BASE_PATH}/${entityName}${CRUD_ACTIONS.CREATE}`,
    entityData
  );
};

const getAllEntities = async (entityName: string) => {
  return executeApiCall(
    "get",
    `${API_BASE_PATH}/${entityName}${CRUD_ACTIONS.READ_ALL}`
  );
};

const getEntityById = async (entityName: string, entityId: string) => {
  return executeApiCall(
    "get",
    `${API_BASE_PATH}/${entityName}${CRUD_ACTIONS.READ_ONE.replace(
      ":id",
      entityId
    )}`
  );
};

const updateEntity = async (
  entityName: string,
  entityId: string,
  entityData: any
) => {
  return executeApiCall(
    "put",
    `${API_BASE_PATH}/${entityName}${CRUD_ACTIONS.UPDATE.replace(
      ":id",
      entityId
    )}`,
    entityData
  );
};

const deleteEntity = async (entityName: string, entityId: number) => {
  return executeApiCall(
    "delete",
    `${API_BASE_PATH}/${entityName}${CRUD_ACTIONS.DELETE.replace(
      ":id",
      entityId.toString()
    )}`
  );
};

export {
  createEntity,
  updateEntity,
  deleteEntity,
  getEntityById,
  getAllEntities,
  apiClient
};
