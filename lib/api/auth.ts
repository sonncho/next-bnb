import axios from 'axios';

interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

// 회원가입 api
// eslint-disable-next-line import/prefer-default-export
export const singupAPI = (body: SignUpAPIBody) => axios.post('/api/auth/signup', body);
