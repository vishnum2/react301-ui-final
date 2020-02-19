import axiosWrapper from '../../../../apis/axiosCreate';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SENT_CARDS, RECEIVED_CARDS, USER_DETAILS, REDEEM_CARD } from "./types";
import {fetchReceivedCards, fetchSentCards, userDetails, redeemCard, updateUserBalance, updateTransact } from './index';

// const middlewares = [thunk];
const mockStore = configureStore([thunk]);
const store = mockStore();
// jest.mock('axios');

describe('test the actions of user', () => {

    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
      });

    // it('should fetch received cards', async () => {
    //     // const expectedActions = [{
    //     //     type: RECEIVED_CARDS,
    //     //     payload: {}
    //     // }]
    //     store.dispatch(fetchReceivedCards('test'));
    //     // expect(store.getActions()).toEqual(expectedActions);
    //     expect(store.getActions()).toMatchSnapshot();
    // });

    // it('should fetch received cards', async () => {
    //     store.dispatch(fetchSentCards('test'));
    //     expect(store.getActions()).toMatchSnapshot();
    // });

    // it('should fetch received cards', async () => {
    //     store.dispatch(userDetails('test'));
    //     expect(store.getActions()).toMatchSnapshot();
    // });

    // it('should fetch received cards', async () => {
    //     store.dispatch(redeemCard(2, {}));
    //     expect(store.getActions()).toMatchSnapshot();
    // });

    it('should fetch received cards', async () => {
        store.dispatch(updateUserBalance(2, 30));
        expect(store.getActions()).toMatchSnapshot();
    });

    it('should fetch received cards', async () => {
        store.dispatch(updateTransact(2, 30));
        expect(store.getActions()).toMatchSnapshot(); 
    });
});

describe('testing dispatch of actions', () => {
    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn().mockImplementation((args) => {});
    });

    it('should fetch received cards', async () => {
        axiosWrapper.get = jest
        .fn()
        .mockImplementation(() => Promise.resolve({ data : {card: "kjsdf"} }));
        const returnedFunction = fetchReceivedCards('test');
        await returnedFunction(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
            type: RECEIVED_CARDS,
            payload: { card: "kjsdf" }
        })
    });

    it('should fetch sent cards', async () => {
        axiosWrapper.get = jest
        .fn()
        .mockImplementation(() => Promise.resolve({ data : {card: "kjsdf"} }));
        const returnedFunction = fetchSentCards('test');
        await returnedFunction(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
            type: SENT_CARDS,
            payload: { card: "kjsdf" }
        })
    });

    it('should return user details', async () => {
        axiosWrapper.get = jest
        .fn()
        .mockImplementation(() => Promise.resolve({ data : {card: "kjsdf"} }));
        const returnedFunction = userDetails(1);
        await returnedFunction(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
            type: USER_DETAILS,
            payload: { card: "kjsdf" }
        })
    });

    it('should redeem card', async () => {
        axiosWrapper.delete = jest.fn();
        axiosWrapper.post = jest
        .fn()
        .mockImplementation(() => Promise.resolve({ data : {card: "kjsdf"} }));
        const returnedFunction = redeemCard(1, {});
        await returnedFunction(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
            type: REDEEM_CARD,
            payload: { card: "kjsdf" }
        })
    });

    // it('should throw erro', async () => {
    //     axiosWrapper.post = jest
    //     .fn()
    //     .mockImplementation(() => Promise.resolve({err: 'err'}).catch({err: 'errq'}));
    //     const returnedFunction = updateUserBalance(1, 10);
    //     expect(await axiosWrapper.post).resolves.toBe({err: 'err'});
    // });
});