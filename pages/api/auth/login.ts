import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.statusCode = 400;
        return res.send('필수 데이터가 없습니다.');
      }
      const user = Data.user.find({ email });
      if (!user) {
        res.statusCode = 404;
        return res.send('해당 이메일의 유저가 없습니다.');
      }

      //* 비밀번호 일치 여부
      const isPasswordMatched = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatched) {
        res.statusCode = 403;
        return res.send('비밀번호가 일치하지 않습니다.');
      }

      const token = jwt.sign(String(user.id), process.env.JWT_SECRET!);
      res.setHeader(
        'Set-Cookie',
        `access_token=${token}; Path=/; Expires=${new Date(
          Date.now() + 60 * 60 * 24 * 1000 * 3 //3일
        ).toUTCString()}; HttpOnly`
      );

      const userWithoutPassword: Partial<Pick<StoredUserType, 'password'>> = user;
      delete userWithoutPassword.password;

      res.statusCode = 200;
      return res.send(user);
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      return res.send(error);
    }
  }
  res.statusCode = 405;

  return res.end();
};
