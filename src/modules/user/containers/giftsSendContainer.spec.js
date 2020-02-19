import React from 'react';
import {shallow} from '../../../enzyme';
import {GiftsSendContainer} from './giftsSendContainer';

describe('snapshot', () => {
    it('should do snapshot test', () => {
        const wrapper = shallow(<GiftsSendContainer fetchSentCards={jest.fn()}  />);
        expect(wrapper).toMatchSnapshot();
        const error = new Error('test');
        wrapper.simulateError(error);
    });

    it('check and render login', () => {
        const wrapper = shallow(<GiftsSendContainer sentCards={[]} isLoggedIn={true} fetchSentCards={jest.fn()}  user={{user: 'new'}} />);
        expect(wrapper.find('h2')).toHaveLength(1);
    });
});
