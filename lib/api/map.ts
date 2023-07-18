import axios from '.';

type LocationInfo = {
  latitude: number;
  longitude: number;
};

type GeoLocationInfoAPIResponse = {
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
};

//* 현재 우치 정보 가져오기 api
// eslint-disable-next-line import/prefer-default-export
export const getLocationInfoApi = async ({ latitude, longitude }: LocationInfo) =>
  axios.get<GeoLocationInfoAPIResponse>(
    `/api/maps/location?latitude=${latitude}&longitude=${longitude}`
  );
