import React from 'react';
import {shallow} from '../../enzyme';
import Landing from './Landing';

describe('snapshot', () => {
    it('should do snapshot test', () => {
        const wrapper = shallow(<Landing />);
        expect(wrapper).toMatchSnapshot();
    })
});
