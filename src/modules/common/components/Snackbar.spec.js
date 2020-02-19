import React from 'react';
import {mount, shallow} from '../../../enzyme';
import MySnackBar from './Snackbar';
// import { shallow } from 'enzyme';

describe('Snackbar Component', () => {
    it('should contain correct props', () => {
        const wrapper = mount(<MySnackBar message='im snackbar' color="blue" />);
        // console.log(wrapper.debug());
        expect(wrapper.props().message).toEqual('im snackbar');
    });
});

describe('Snackbar render', () => {
    it('should render properly', () => {
        const wrapper = shallow(<MySnackBar />);
        // console.log(wrapper.debug());
        expect(wrapper.find('div')).toHaveLength(1);
    });
});