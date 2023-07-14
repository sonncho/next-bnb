import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BedType } from '../types/room';

type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bathroomCount: number;
  bathroomType: 'private' | 'public' | null;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
};

//* 초기상태
const initialState: RegisterRoomState = {
  largeBuildingType: null, //- 건물 유형 큰 범주(대분류)
  buildingType: null, //- 건물 유형(소분류)
  roomType: null, //- 숙소 유형
  isSetUpForGuest: null, //- 게스트만을 위해 만들어진 숙소인가?
  maximumGuestCount: 1, //- 최대 숙박 인원
  bedroomCount: 0, //- 침실 개수
  bedCount: 1, //-침대 개수
  bedList: [], //- 침대 유형
  publicBedList: [], //-공용공간 침대 유형
  bathroomCount: 1,
  bathroomType: null,
  country: '', //-국가/지역
  city: '', //- 시/도
  district: '', //- 시/군/구
  streetAddress: '', //- 도로명주소
  detailAddress: '', //- 동호수
  postcode: '', //-우편번호
  latitude: 0, //-위도
  longitude: 0, //-경도
};

const registerRoom = createSlice({
  name: 'registerRoom',
  initialState,
  reducers: {
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.largeBuildingType = null;
      }
      state.largeBuildingType = action.payload;
    },
    setBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.buildingType = null;
      }
      state.buildingType = action.payload;
      return state;
    },
    setRoomType(state, action: PayloadAction<'entire' | 'private' | 'public'>) {
      state.roomType = action.payload;
      return state;
    },
    setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
      return state;
    },
    //* 최대 숙박 인원 변경하기
    setMaximumCuestCount(state, action: PayloadAction<number>) {
      state.maximumGuestCount = action.payload;
      return state;
    },
    //* 침실 개수 변경하기
    setBedroomCount(state, action: PayloadAction<number>) {
      const bedroomCount = action.payload;
      let { bedList } = state;

      state.bedroomCount = bedroomCount;

      if (bedroomCount < bedList.length) {
        // 기존 침대 개수가 더 많으면 초과 부분 잘라내기
        bedList = state.bedList.slice(0, bedroomCount);
      } else {
        // 변경된 침대 개수가 더 많으면 나머지 침실 채우기
        for (let i = bedList.length + 1; i < bedroomCount + 1; i += 1) {
          bedList.push({ id: i, beds: [] });
        }
      }

      state.bedList = bedList;

      return state;
    },
    //* 최대 침대 개수 변경하기
    setBedCount(state, action: PayloadAction<number>) {
      state.bedCount = action.payload;
      return state;
    },

    //* 침대 유형 개수 변경하기
    setBedTypeCount(
      state,
      action: PayloadAction<{ bedroomId: number; type: BedType; count: number }>
    ) {
      const { bedroomId, type, count } = action.payload;

      const bedroom = state.bedList[bedroomId - 1];
      const prevBeds = bedroom.beds;

      const index = prevBeds.findIndex((bed) => bed.type === type);
      if (index === -1) {
        // 타입이 없으면
        state.bedList[bedroomId - 1].beds = [...prevBeds, { type, count }];
        return state;
      }
      // 타입이 존재한다면
      if (count === 0) {
        state.bedList[bedroomId - 1].beds.splice(index, 1);
      } else {
        state.bedList[bedroomId - 1].beds[index].count = count;
      }
      return state;
    },

    //* 공용공간 침대 유형 개수 변경하기
    setPublicBedTypeCount(state, action: PayloadAction<{ type: BedType; count: number }>) {
      const { type, count } = action.payload;

      const index = state.publicBedList.findIndex((bed) => bed.type === type);
      if (index === -1) {
        //* 타입이 없다면
        state.publicBedList = [...state.publicBedList, { type, count }];
        return state;
      }
      //* 타입이 존재한다면
      if (count === 0) {
        state.publicBedList.splice(index, 1);
      } else {
        state.publicBedList[index].count = count;
      }
      return state;
    },

    //* 욕실 개수 변경하기
    setBathroomCount(state, action: PayloadAction<number>) {
      state.bathroomCount = action.payload;
      return state;
    },

    //* 욕실 유형 변경하기
    setBathroomType(state, action: PayloadAction<'private' | 'public' | null>) {
      state.bathroomType = action.payload;
    },

    //* 국가 변경하기
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    //* 시/도 변경하기
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    //* 시/군/구 변경하기
    setDistrict(state, action: PayloadAction<string>) {
      state.district = action.payload;
    },
    //* 도로명주소 변경하기
    setStreetAddress(state, action: PayloadAction<string>) {
      state.streetAddress = action.payload;
    },
    //* 동호수 변경하기
    setDetailAddress(state, action: PayloadAction<string>) {
      state.detailAddress = action.payload;
    },
    //* 우편번호 변경하기
    setPostcode(state, action: PayloadAction<string>) {
      state.postcode = action.payload;
    },
    //* 위도 변경하기
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    //* 경도 변경하기
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
