import React from 'react';
import {shallow} from '../../../enzyme';
import {TablePaginationActions} from './TablePaginationActionsWrapped';

describe('snapshot', () => {
    it('should do snapshot test', () => {
        const wrapper = shallow(<TablePaginationActions  classes={{}} count = {2} onChangePage= {jest.fn()} page= {2} rowsPerPage= {2} theme={{}} />);
        expect(wrapper).toMatchSnapshot();
    })
});
