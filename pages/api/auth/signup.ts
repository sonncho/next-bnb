import { NextApiResponse, NextApiRequest } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { body } = req;
    const { email, firstname, lastname, password, birthday } = body;

    if (!email || !firstname || !lastname || !password || !birthday) {
      res.statusCode = 400;
      return res.send('필수 데이터가 없습니다.');
    }

    const userExist = Data.user.exist({ email });
    if (userExist) {
      res.statusCode = 400;
      return res.send('이미 가입된 이메일입니다.');
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const users = Data.user.getList();
    let userId;
    if (users.length === 0) {
      // users가 존재하지 않으면
      userId = 1;
    } else {
      userId = users[users.length - 1].id + 1;
    }
    const newUser: StoredUserType = {
      id: userId,
      email,
      firstname,
      lastname,
      password: hashedPassword,
      birthday,
      profileImage: '/static/image/user/default_user_profile_image.jpg',
    };

    // accessToken을 쿠키에 저장.
    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);
    res.setHeader(
      'Set-Cookie',
      `access_token=${token}; Path=/; Expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3 //3일
      ).toUTCString()}; HttpOnly`
    );

    Data.user.write([...users, newUser]);

    // user정보에서 password를 제외한 값들을 전달
    // Pick을 이용해 password type값만 전달받고
    // partial로 인터페이스의 모든 프로퍼티를 optional하게 변경한다
    const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> = newUser;

    delete newUserWithoutPassword.password;
    res.statusCode = 200;
    return res.send(newUser);
    // return res.end();
  }

  res.statusCode = 405;
  return res.end();
};
