import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //* 로그아웃 하기
    if (req.method === 'DELETE') {
      res.setHeader(
        'Set-Cookie',
        `access_token=; Path=/; Expires=${new Date(
          'Thu, 01 Jan 1970 00:00:00 GMT'
        ).toUTCString()}; httpOnly`
      );
      res.statusCode = 203;
      return res.end();
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return res.send(error.message);
    }
  }
  res.statusCode = 405;
  return res.end();
};
