import React from 'react';
import {shallow} from '../../../enzyme';
import Profile from './profile';

describe('snapshot', () => {
    it('should do snapshot test', () => {
        const wrapper = shallow(<Profile detailsObject={{}}/>);
        expect(wrapper).toMatchSnapshot();
    })
});
