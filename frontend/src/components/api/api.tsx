import axios from 'axios';

const API_URL = 'api/v2/';

export const getFacilities = () => axios.get(`${API_URL}/facilities/`);
export const getFacility = (id: number) => axios.get(`${API_URL}/facilities/${id}/`);
export const createFacility = (facility: any, config: any) => axios.post(`${API_URL}facilities/`, facility, config);
export const updateFacility = (id: number, facility: any) => axios.put(`${API_URL}/facilities/${id}/`, facility);
export const archiveFacility = (id: number) => axios.patch(`${API_URL}/facilities/${id}/archive/`);
export const createDistricts = (district: any, config: any) => axios.post(`${API_URL}districts/`, district, config);
