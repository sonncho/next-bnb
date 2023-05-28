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
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
