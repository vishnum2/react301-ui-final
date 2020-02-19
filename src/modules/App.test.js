import React from 'react';
import App from './App';
import {shallow} from '../enzyme';
import {Loading} from './App';
import LinearProgress from "@material-ui/core/LinearProgress";

describe('snapshot of component', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('checking the loader render', () => {
    it('should render loader properly', () => {
        const error = {new: 'new'};
        const response = Loading(error);
        // console.log(response);
    });
});