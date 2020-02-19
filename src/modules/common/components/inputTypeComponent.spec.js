import React from 'react';
import {shallow} from '../../../enzyme';
import InputTypeComponent from './inputTypeComponent';

describe('snapshot', () => {
    it('should do snapshot test', () => {
        const wrapper = shallow(<InputTypeComponent />);
        expect(wrapper).toMatchSnapshot();
    })
});
