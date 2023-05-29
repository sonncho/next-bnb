import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import palette from '../../styles/palette';
import { BedType } from '../../types/room';
import Button from '../common/Button';
import Selector from '../common/Selector';
import { bedTypes } from '../../lib/staticData';
import Counter from '../common/Counter';
import { registerRoomActions } from '../../store/registerRoom';

const Container = styled.li`
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${palette.gray_dd};
  &:last-of-type {
    border-bottom: 1px solid ${palette.gray_dd};
  }

  .register-room-bed-type-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }
  .register-room-bed-type-selector-wrapper {
    width: 320px;
  }
  .register-room-bed-type-counters {
    width: 320px;
    margin-top: 28px;
  }
  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }
  .register-room-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${palette.gray_76};
  }
`;

interface IProps {
  bedroom: {
    id: number;
    beds: { type: BedType; count: number }[];
  };
}

const RegisterRoomBedTypes = ({ bedroom }: IProps) => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState<boolean>(false);

  const initialBedOptions = bedroom.beds.map((bed) => bed.type);

  //* 선택된 침대 옵션들
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>(initialBedOptions);

  //* 남은 침대 옵션들
  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions, bedroom]);

  //* 침대 개수 총합
  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);

  //* 침실 유형 열고닫기
  const toggleOpened = () => setOpened(!opened);

  //* 침실 침대 개수 변경 시
  const onChangeBedTypeCount = (value: number, type: BedType) => {
    dispatch(
      registerRoomActions.setBedTypeCount({
        bedroomId: bedroom.id,
        type,
        count: value,
      })
    );
  };

  //* 침대 종류 텍스트
  const bedsText = useMemo(() => {
    const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count}개`);
    return texts.join(',');
  }, [bedroom]);

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div className="register-room-bed-type-bedroom-texts">
          <p className="register-room-bed-type-bedroom">{bedroom.id}번 침실</p>
          <p className="register-room-bed-type-bedroom-counts">
            침대 {totalBedsCount}개<br /> {bedsText}
          </p>
        </div>
        <Button onClick={toggleOpened} styleType="register" color="white">
          {opened && '완료'}
          {!opened && (totalBedsCount === 0 ? '침대 추가하기' : '침대 수정하기')}
        </Button>
      </div>

      {opened && (
        <div className="register-room-bed-type-selector-wrapper">
          {activedBedOptions.map((type) => (
            <div className="register-room-bed-type-counters">
              <div className="register-room-bed-type-counter" key={type}>
                <Counter
                  label={type}
                  value={bedroom.beds.find((bed) => bed.type === type)?.count || 0}
                  key={type}
                  onChange={(value) => onChangeBedTypeCount(value, type)}
                />
              </div>
            </div>
          ))}
          <Selector
            type="register"
            options={lastBedOptions}
            value="다른 침대 추가"
            disabledOptions={['다른 침대 추가']}
            useValidation={false}
            onChange={(e) =>
              setActivedBedOptions([...activedBedOptions, e.target.value as BedType])
            }
          />
        </div>
      )}
    </Container>
  );
};

export default RegisterRoomBedTypes;
