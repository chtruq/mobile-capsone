import apiClient from "./apiClient";

export const getProjects = async () => {
  try {
    const response = await apiClient.get("/projects/get-all");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectsSearch = async (search?: string) => {
  try {
    const response = await apiClient.get(
      `/projects/search?pageIndex=1&pageSize=10&search=${search}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectDetail = async (id: string) => {
  try {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectCart = async (id: string) => {
  try {
    const response = await apiClient.get(
      `/projects/search?ApartmentProjectProviderID=${id}&pageIndex=1&pageSize=20`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const projectsSearch = async (
  projectName: string,
  page: number,
  providerId?: string
) => {
  try {
    const response = await apiClient.get(
      `/projects/search?keyword=${projectName}&ApartmentProjectProviderID=${
        providerId ? providerId : ""
      }&pageIndex=${page}&pageSize=5`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
