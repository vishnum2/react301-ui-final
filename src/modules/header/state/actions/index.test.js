import {login, logout, createUser} from './index';
import { LOGIN, LOGOUT } from "./types";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axiosWrapper from "../../../../apis/axiosCreate";

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('test actions', () => {
    it('should return the proper response on login', () => {
        const object = {sample: 'test'};
        const response = login(object);
        expect(response).toEqual({
            type: LOGIN,
            payload: object
          });
    });

    it('should return proper response on logout', () => {
        const response = logout();
        expect(response).toEqual({
            type: LOGOUT,
            payload: null
          });
    });

    it('should call post and resolve', () => {
        store.dispatch(createUser({}));
        expect(store.getActions()).toMatchSnapshot();
        
    })

});