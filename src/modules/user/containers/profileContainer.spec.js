import React from 'react';
import {shallow} from '../../../enzyme';
import {ProfileContainer, mapStateToProps} from './profileContainers';

describe('snapshot', () => {
    it('should do snapshot test', () => {
        const wrapper = shallow(<ProfileContainer userDetails={jest.fn()} detailsObject={{id: 'new'}}/>);
        expect(wrapper).toMatchSnapshot();
    })
});

describe('logged in check', () => {
    it('should render on login', () => {
        const wrapper = shallow(<ProfileContainer isLoggedIn={true} user={{balance_points: 12}}  userDetails={jest.fn()} detailsObject={{id: 'new'}}/>);
        expect(wrapper).toMatchSnapshot();
    })
})

describe('check mapstate', () => {
    it('should check mapstatetoprops', () => {
        const state = {
            login: {
                loginStatus: true,
                detailsObject: []
            },
            users: {
                userDetails: [{
                    new: 'user'
                }]
            }
        }
        const response = {
            isLoggedIn: state.login.loginStatus,
            detailsObject: state.login.detailsObject,
            user: state.users.UserDetails
        }
        expect(mapStateToProps(state)).toEqual(response);
    })
})
