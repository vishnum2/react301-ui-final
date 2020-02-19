import React from 'react';
import {shallow} from '../../../enzyme';
import GiftsList from './GiftsList';
import { mount } from 'enzyme';

describe('snapshot of GiftList', () => {
    it('should do a snapshot test', () => {
        const wrapper = shallow(<GiftsList classes={{}}/>);
        expect(wrapper).toMatchSnapshot();
    })
});

describe('check render of GiftList', () => {
    it('should render properly', () => {
        const wrapper = mount(<GiftsList classes={{}} giftCardsFiltered={[]} userDetails={{}}/>);
        wrapper.setState({rowsPerpage: 10, page: 1});
        // wrapper.debug();
        // console.log(wrapper.find('GiftsList').debug());

    })
});