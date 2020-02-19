import { FETCH_CARDS, FETCH_CARD, FETCH_CARD_FILTER, UPDATE_CARD_COUNT, ADMIN_ADD_CARD, ADMIN_UPDATE_CARD} from '../actions/types';
import giftsReducer from './giftsReducer';

describe('test the gifts reducer', () => {
    it('should respond to fetch card with correct data', () => {
        const action = {
            type: FETCH_CARD,
            payload: {
                data: 'test'
            } 
        };

        expect(giftsReducer({}, action)).toEqual({
            giftCard: action.payload.data
        })
    });

    it('should respond to fetch cards', () => {
        const action = {
            type: FETCH_CARDS,
            payload: {
                data: 'test'
            } 
        };

        expect(giftsReducer({}, action)).toEqual({
            giftCards: action.payload.data,
            giftCardsFiltered: action.payload.data
        })
    });

    it('should respond to admin adding cards', () => {
        const action = {
            type: ADMIN_ADD_CARD,
            payload: {
                data: 'test'
            } 
        };

        expect(giftsReducer({}, action)).toEqual({
            giftCards: action.payload
        })
    });

    it('should respond to admin updating cards', () => {
        const action = {
            type: ADMIN_UPDATE_CARD,
            payload: {
                data: {
                    id: 1
                }
            } 
        };

        expect(giftsReducer({giftCards: [{id: 2}]}, action)).toEqual({
            giftCards: [{id: 2}]
        })
        expect(giftsReducer({giftCards: [{id: 1}]}, action)).toEqual({
            giftCards: [{id: 1}]
        })
    });

    it('should respond to fetch card filter', () => {
        const action = {
            type: FETCH_CARD_FILTER,
            payload: {
                data: 'test'
            } 
        };

        expect(giftsReducer({}, action)).toEqual({
            giftCardsFiltered: action.payload
        })
    });

    it('should respond to update card count', () => {
        const action = {
            type: UPDATE_CARD_COUNT,
            payload: {
                data: 'test'
            } 
        };

        expect(giftsReducer({}, action)).toEqual({
            giftCard: action.payload
        })
    });

    it('should respond to admin adding cards', () => {
        const action = {
            type: '',
            payload: {
                data: 'test'
            } 
        };

        expect(giftsReducer({sample: 'default'}, action)).toEqual({sample: 'default'})
    });
});