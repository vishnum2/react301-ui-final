import React from 'react';
import {Footer} from './Footer';
import { shallow } from '../../../enzyme';

describe('just a sample' ,() => {
    it('checks the sum', () => {
        expect(2+2).toBe(4);
    });
});

describe('to check the footer', () => {
    it('should render once', () => {
        const wrapper = shallow(<Footer classes={{}}/>);
        expect(wrapper.find('div').length).toBe(1);
    });
});