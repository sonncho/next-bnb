import axios from '.';
import { UserType } from '../../types/user';

interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

//* 회원가입 api
export const singupAPI = (body: SignUpAPIBody) => axios.post<UserType>('/api/auth/signup', body);

//* 로그인 api
export const loginAPI = (body: { email: string; password: string }) =>
  axios.post<UserType>('/api/auth/login', body);

//* 쿠키의 access_token의 유저 정보를 받아오는 api
export const meAPI = () => axios.get<UserType>('/api/auth/me');