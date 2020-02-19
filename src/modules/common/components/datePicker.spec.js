import React from 'react';
import {shallow} from '../../../enzyme';
import {DatePickers, styles} from './datePicker';

describe('snapshot', () => {
    it('should do snapshot test', () => {
        const wrapper = shallow(<DatePickers classes={{}}/>);
        expect(wrapper).toMatchSnapshot();
    })
});

// describe('test styles function', () => {
//     it('should return proper style',() => {
//         const temp = {
//             spacing: {
//                 unit: {}
//             }
//         };
//         expect(styles(temp)).toEqual(temp);
//     })
// })