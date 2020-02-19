import React from 'react';
import {shallow} from '../../../enzyme';
import GiftsReceived from './giftsReceived';

describe('snapshot', () => {
    it('should do snapshot test', () => {
        const wrapper = shallow(<GiftsReceived classes={{}}/>);
        expect(wrapper).toMatchSnapshot();
    })
});
