import React from 'react';
import Giftshow from './GiftShow';
import { shallow, mount } from '../../../enzyme';

describe('snapshot of Giftshow', () => {
    it('captures and tests snapshot', () => {
        const wrapper = shallow(<Giftshow data={{}}/>);
        expect(wrapper).toMatchSnapshot();
    })
});

describe('getEmail function mock', () => {
    it('should mock function and run', () => {
        const props =  jest.fn();
        const wrapper = shallow(<Giftshow data={{cardComments: [{comment: 'erf', first_name: '', last_name: '', commented_On: '', rating: ''}]}} getEmail={props}/>);
        wrapper.find('DraggableDialog').props().getEmail();
        expect(props).toHaveBeenCalled();
        
    })
})

describe('sendCardDialog renders in GiftShow', () => {
    it('should render sendcardDialog', () => {
        const wrapper = mount(<Giftshow data={{}} />);
        // console.log(wrapper.find({testData: 'sendGiftCardDialog'}).debug());
        expect(wrapper.find({testData: 'sendGiftCardDialog'})).toHaveLength(1);
    })
})