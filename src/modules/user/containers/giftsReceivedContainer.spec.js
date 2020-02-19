import {mapStateToProps} from './giftsReceivedContainer';
import React from 'react';
import {shallow} from '../../../enzyme';
import {GiftsReceivedContainer} from './giftsReceivedContainer';

describe('snapshot', () => {
    it('should do snapshot test', () => {
        const wrapper = shallow(<GiftsReceivedContainer />);
        expect(wrapper).toMatchSnapshot();
    })
});


describe('check mapStateToProps return',() => {
    it('should return properly', () => {
        const state = {
            login: {
                loginStatus: true
            },
            users: {
                cards: [{}]
            },
            login: {
                detailsObject: {}
            }
        }

        const result = {
            isLoggedIn: state.login.loginStatus,
            receivedCards: state.users.cards,
            user: state.login.detailsObject
        }

        expect(mapStateToProps(state)).toEqual(result);
    })
})