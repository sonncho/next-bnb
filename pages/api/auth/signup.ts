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

    Data.user.write([...users, newUser]);

    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);
    res.setHeader(
      'Set-Cookie',
      `access_token=${token}; Path=/; Expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3 //3일
      ).toUTCString()}; HttpOnly`
    );

    return res.end();
  }
  res.statusCode = 405;
  return res.end();
};
