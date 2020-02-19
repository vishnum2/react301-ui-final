import { LOGIN, LOGOUT } from "../actions/types";
import loginReducer from './loginReducer';

describe('check the reducer', () => {
    it('should return proper state on login', () => {
        const action = {
            type: LOGIN,
            payload: {sample: 'sample'}
        };
        expect(loginReducer({}, action)).toEqual({
            loginStatus: true,
            detailsObject: action.payload
        });
    });

    it('should return proper state on logout', () => {
        const action = {
            type: LOGOUT
        };
        expect(loginReducer({}, action)).toEqual({
            loginStatus: false,
            detailsObject: {}
        });
    });

});