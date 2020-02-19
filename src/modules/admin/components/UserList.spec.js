import React from 'react';
import {shallow, mount} from '../../../enzyme';
import UsersList from './UsersList';
import axiosWrapper from '../../../apis/axiosCreate';

describe('check the snapshot', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(<UsersList />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should get all users', () => {
        // window.sessionStorage.getItem = jest.fn().mockImplementationOnce(() => 'admin');
        axiosWrapper.get = jest.fn().mockImplementationOnce(() => Promise.resolve({data: 'new'}));
        window.sessionStorage.setItem('usertype', 'admin');
        const wrapper = mount(<UsersList />);
        expect(axiosWrapper.get).toHaveBeenCalledTimes(1);
    })
})