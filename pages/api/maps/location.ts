import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      res.statusCode = 400;
      return res.send('위치정보가 없습니다.');
    }

    try {
      const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;
      // const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${'37.4474874'}&y=${'127.1291592'}`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
        },
      });

      const roadAddress = data.documents[0].road_address;

      const result = {
        latitude,
        longitude,
        country: '한국',
        city: roadAddress.region_1depth_name,
        district: roadAddress.region_2depth_name,
        streetAddress: `${roadAddress.road_name} ${roadAddress.main_building_no}`,
        postcode: roadAddress.zone_no,
      };

      res.statusCode = 200;
      res.send(result);
    } catch (error) {
      res.statusCode = 400;
      return res.end();
    }
  }
  res.statusCode = 405;
  return res.end();
};
