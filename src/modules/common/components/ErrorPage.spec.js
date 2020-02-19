import React from 'react';
import { shallow } from '../../../enzyme';
import ErrorPage from './ErrorPage';

describe('error page render', () => {
    it('should render properly', () => {
        const wrapper = shallow(<ErrorPage />);
        // console.log(wrapper.debug());
        expect(wrapper.find('img')).toHaveLength(1);
    });
});