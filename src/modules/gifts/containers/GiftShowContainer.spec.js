import React from 'react';
import {shallow, mount} from '../../../enzyme';
import {GiftShowContainer} from './GiftShowContainer';
import {mapStateToProps} from './GiftShowContainer';
// import * as emailjs from 'emailjs-com';
// const emailjs = require('emailjs-com');

jest.mock('emailjs-com');

import * as emailjs from 'emailjs-com';

describe('snapshot', () => {
    it('should do snapshot test', () => {
        const mockFn = jest.fn().mockImplementation(() => Promise.resolve({new: 'new'}))
        const wrapper = shallow(<GiftShowContainer isLoggedIn={false} userDetails={mockFn} fetchCard={jest.fn()} gift={{}} match={{params: {id: '1'}}}/>);
        expect(wrapper).toMatchSnapshot();
        wrapper.setState({showErrorSnackBar: true});
        wrapper.update();
        const error = new Error('test');
        wrapper.simulateError(error);
    })
});

describe('test mapStateToProps', () => {
    it('should return proper object', () => {
        const state = {
            gifts: {
                gitfCard: {}
            },
            users: {
                userDetails: {}
            },
            login: {
                detailsObject: {},
                loginStatus: true
            }
        };

        const response = {
            gift: state.gifts.giftCard,
            user: state.users.UserDetails,
            login: state.login.detailsObject,
            isLoggedIn: state.login.loginStatus,
        };
        expect(mapStateToProps(state)).toEqual(response);
    });
});

describe('to test render',  () => {
    jest.useFakeTimers();
    it('should render component properly', async () => {
        const giftCard = {
            "id":"5e491e59564728ace9e4e32f",
            "cardName":"COMSTRUCT",
            "cardPoints":2340,
            "cardCategory":"Ecommerce",
            "cardRetailer":"Foodpanda",
            "cardIssueDate":"Wednesday,September 13, 2017 5:17 AM",
            "cardExpiryDate":"Sunday, February 2, 2020 9:07 AM",
            "cardCount":718,
            "cardImage":"https://d2e70e9yced57e.cloudfront.net/wallethub/posts/68808/best-gift-cards.png",
            "cardVendor":"Foodpanda","cardShortDesc":"10% OFF",
            "cardLongDesc":"Gift Cards are the Perfect Gift, Every Time. Use the  Gift Card to shop from millions of items  Goods and everything in-between.  Gift Cards never expire and have no fees. Use it to shop now or wait for the deal of a lifetime."}

        const props = {
            login: {
                email : 'vishnupriyan4@gmail.com',
                id: 2
            }
        }
        const mockFn = jest.fn().mockImplementation(() => Promise.resolve({new: 'new'}));
        const userbalanceUpdate = jest.fn().mockImplementation(() => Promise.resolve({userBalance: 123}));
        const transacupdateMock = jest.fn().mockImplementation(() => Promise.resolve({userBalanceUpdate: 1123}));
        const cardCountUpdate = jest.fn().mockImplementation(() => Promise.resolve({cardCountUpdate: 123}));
        const wrapper = shallow(<GiftShowContainer isLoggedIn={true} {...props} updateCardCount={cardCountUpdate} updateTransact={transacupdateMock} updateUserBalance={userbalanceUpdate} fetchCard={jest.fn()} userDetails={mockFn} user={{balance_points: 3112}} gift={giftCard} match={{params: {id: '1'}}}/>);
        // wrapper.setState({cardPoints: 12, balance_points: 13});
        // console.log(wrapper.instance())
        wrapper.setState({cardPoints: giftCard.cardPoints, balance_points: 1233});
        emailjs.send = jest.fn().mockImplementationOnce(() => Promise.resolve({emailjs : 'mocked'}));
        await wrapper.instance().validateSend('vishnu.m2@mindtree.com');
        expect(userbalanceUpdate).toHaveBeenCalledWith(props.login.id, 772);
        // wrapper.update();
        jest.runAllTimers();
        wrapper.setState({cardPoints: null, balance_points: 'null'});
        await wrapper.instance().validateSend('vishnu.m2@mindtree.com');
        jest.runAllTimers();
    });

    it('checks the snackbar text', () => {
        const mockFn = jest.fn().mockImplementation(() => Promise.resolve({new: 'new'}))
        const wrapper = shallow(<GiftShowContainer isLoggedIn={false} userDetails={mockFn} fetchCard={jest.fn()} gift={{sample: 'gift'}} match={{params: {id: '1'}}}/>);
        wrapper.setState({showErrorSnackBar: true});
    })
})