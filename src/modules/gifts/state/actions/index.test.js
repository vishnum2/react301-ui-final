import axiosWrapper from '../../../../apis/axiosCreate';
import { fetchCard, fetchCards, adminUpdateCard, fetchCardFilter, adminAddCard, updateCardCount } from './index';
import { FETCH_CARDS, FETCH_CARD, FETCH_CARD_FILTER, ADMIN_ADD_CARD, UPDATE_CARD_COUNT, ADMIN_UPDATE_CARD } from './types';

describe('to check the axios wrapper for actions', () => {

    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn().mockImplementation((args) => {});
    });

    it('fetches card based on id', async () => {
        axiosWrapper.get = jest
        .fn()
        .mockImplementation(() => Promise.resolve({ card: "kjsdf" }));
        const returnedFunction = fetchCard(1);
        await returnedFunction(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
            type: FETCH_CARD,
            payload: { card: "kjsdf" }
        })
    });

    it('fetches all cards', async () => {
        axiosWrapper.get = jest
        .fn()
        .mockImplementation(() => Promise.resolve({ card: "kjsdf" }));
        const returnedFunction = fetchCards();
        await returnedFunction(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
            type: FETCH_CARDS,
            payload: { card: "kjsdf" }
        })
    });

    it('admin should update cards', async () => {
        axiosWrapper.patch = jest
            .fn()
            .mockImplementation(() => Promise.resolve({ card: "kjsdf" }));
        // console.log(expect(await adminUpdateCard(1, {new: 'new'})(dispatch)));
        const returnedFunction = adminUpdateCard(1, {});
        // console.log(returnedFunction);
        
        await returnedFunction(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
            type: ADMIN_UPDATE_CARD,
            payload: { card: "kjsdf" }
        });
    });

    it('fetches card filter', async () => {
        const returnedFunction = fetchCardFilter({sample: 'sample'});
        await returnedFunction(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
            type: FETCH_CARD_FILTER,
            payload: { sample: 'sample' }
        })
    });

    it('admin add card', async () => {
        axiosWrapper.post = jest
        .fn()
        .mockImplementation(() => Promise.resolve({ post: 'data' }));
        const returnedFunction = adminAddCard({});
        await returnedFunction(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
            type: ADMIN_ADD_CARD,
            payload: { post: 'data' }
        })
    });

    it('update card count', async () => {
        axiosWrapper.patch = jest
        .fn()
        .mockImplementation(() => Promise.resolve({ data: {count: 'kjsdf'} }));
        const returnedFunction = updateCardCount(1, 10);
        await returnedFunction(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
            type: UPDATE_CARD_COUNT,
            payload: { count: 'kjsdf' }
        })
    });
});