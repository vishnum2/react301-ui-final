import userReducer from './usersReducer';
import { RECEIVED_CARDS, SENT_CARDS, USER_DETAILS, REDEEM_CARD, UPDATE_BALANCE, UPDATE_TRANSACT } from './../actions/types';

describe('test the reducer', () => {
    it('should return proper objects for RECEIVED_CARDS ', () => {
        const action = {
            type: RECEIVED_CARDS,
            payload: {new: 'new'}
        }
        expect(userReducer({}, action)).toEqual({cards: action.payload});
    });

    it('should return proper objects for SENT_CARDS', () => {
        const action = {
            type: SENT_CARDS,
            payload: {new: 'new'}
        }
        expect(userReducer({}, action)).toEqual({cards: action.payload});
    });

    it('should return proper objects for USER_DETAILS', () => {
        const action = {
            type: USER_DETAILS,
            payload: {new: 'new'}
        }
        expect(userReducer({}, action)).toEqual({UserDetails: action.payload});
    });

    it('should return proper objects for REDEEM_CARD', () => {
        const action = {
            type: REDEEM_CARD,
            payload: {id: 1}
        }
        expect(userReducer({cards: [{id: 2}]}, action)).toEqual({cards: [{id: 2}]});
    });

    it('should return proper objects for REDEEM_CARD', () => {
        const action = {
            type: REDEEM_CARD,
            payload: {id: 1}
        }
        expect(userReducer({cards: [{id: 1}]}, action)).toEqual({cards: [{id: 1, isRedeemed: true}]});
    });

    it('should return proper objects for UPDATE_BALANCE', () => {
        const action = {
            type: UPDATE_BALANCE,
            payload: {new: 'new'}
        }
        expect(userReducer({}, action)).toEqual({UserDetails: action.payload});
    });

    it('should return proper objects for UPDATE_TRANSACT', () => {
        const action = {
            type: UPDATE_TRANSACT,
            payload: {new: 'new'}
        }
        expect(userReducer({}, action)).toEqual({cards: action.payload});
    });
});