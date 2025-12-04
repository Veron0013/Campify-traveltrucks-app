import { CamperFilterData, CampersResponse } from './api.types';
import { mainApi } from './mainApi';

//
export const getCatalogList = async (searchParams: CamperFilterData): Promise<CampersResponse> => {
  //const response = await mainApi.get(`/goods?${params.toString()}`);
  const response = await mainApi.get('', { params: searchParams });
  return response.data;
};
