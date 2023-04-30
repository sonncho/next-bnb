import { useSelector, useDispatch } from 'react-redux';
import { commonActions } from '../store/common';

export default () => {
  const dispatch = useDispatch();
  const validateMode = useSelector((state: any) => state.common.validateMode);

  const setValidateMode = (value: boolean) => dispatch(commonActions.setValidateMode(value));

  return { validateMode, setValidateMode };
};
