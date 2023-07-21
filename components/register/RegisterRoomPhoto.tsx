import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import RegisterContainer from './RegisterContainer';
import { useSelector } from '../../store';
import Button from '../common/Button';
import palette from '../../styles/palette';
import UploadIcon from '../../public/static/svg/register/upload.svg';

const ContentWrapper = styled.div`
  width: 858px;
  height: 433px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${palette.gray_bb};
  border-radius: 6px;

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  img {
    width: 100%;
    max-height: 100%;
  }
`;

const RegisterRoomPhoto = () => {
  // const dispatch = useDispatch();
  const photos = useSelector((state) => state.registerRoom.photos);
  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log(files);
  };

  return (
    <ContentWrapper>
      {photos.length === 0 && (
        <>
          <input type="file" accept="image/*" onChange={uploadImage} />
          <Button icon={<UploadIcon />} color="bitter_sweet" width="167px">
            사진업로드
          </Button>
        </>
      )}
    </ContentWrapper>
  );
};

export default RegisterRoomPhoto;
