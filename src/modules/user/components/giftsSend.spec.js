import React from 'react';
import {shallow, mount} from '../../../enzyme';
import GiftsSend from './giftsSend';

describe('snapshot', () => {
    it('should do snapshot test', () => {
        const wrapper = shallow(<GiftsSend classes={{}} data={{}}/>);
        expect(wrapper).toMatchSnapshot();
        const wrapper1 = mount(<GiftsSend classes={{}} data={[{
            id: 1,
            cardName: 'Ola',
            cardPoints: 123,
            receiverEmail: 'vishnu',
            cardIssueDate: '2019-11-22',
            cardExpiryDate: '2020-11-21'
        }]}/>);
    })
});
