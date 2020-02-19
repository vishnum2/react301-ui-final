import {combineReducerProvider} from './index';
import giftsReducer from '../modules/gifts/state/reducers/giftsReducer';
import loginReducer from '../modules/header/state/reducers/loginReducer';
import usersReducer from '../modules/user/state/reducers/usersReducer';

describe('checks the combined Reducer', () => {
    it('should render the function', () => {
        const response = {
            gifts: giftsReducer,
            login: loginReducer,
            users: usersReducer
        }
        const obtained = combineReducerProvider();
        expect(obtained).toEqual(response);
    })
})