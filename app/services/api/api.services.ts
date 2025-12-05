import { CamperData, CamperFilterData, CampersResponse } from './api.types';
import { mainApi } from './mainApi';

//
export const getCamperList = async (searchParams: CamperFilterData): Promise<CampersResponse> => {
  const response = await mainApi.get('/campers', { params: searchParams });
  return response.data;
};

export const getCamperById = async (id: string): Promise<CamperData> => {
  const response = await mainApi.get(`/campers/${id}`);
  return response.data;
};
