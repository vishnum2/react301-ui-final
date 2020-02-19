import { combineReducers } from 'redux';
import giftsReducer from '../modules/gifts/state/reducers/giftsReducer';
import loginReducer from '../modules/header/state/reducers/loginReducer';
import usersReducer from '../modules/user/state/reducers/usersReducer';

export const combineReducerProvider = () => {
  return {
    gifts: giftsReducer,
    login: loginReducer,
    users: usersReducer
  }
}

const rootReducer = combineReducers(combineReducerProvider());

export default rootReducer;
