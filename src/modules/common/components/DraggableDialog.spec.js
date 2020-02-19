import React from 'react';
import DraggableDialog from './DraggableDialog';
import {shallow, mount} from '../../../enzyme';
import {PaperComponent} from './DraggableDialog';

describe('should check snapshot', () => {
    it('should check snapshot', () => {
        const wrapper = shallow(<DraggableDialog />);
        PaperComponent({});
        expect(wrapper).toMatchSnapshot();
    })
    
    it('simulate the dialog to open and test', async () => {
        const getMailMock = jest.fn();
        const email = 'vishnu.m2@mindtree.com';
        const wrapper = mount(<DraggableDialog getEmail={getMailMock} />);
        wrapper.setState({open: true});
        // console.log(wrapper.instance());
        wrapper.instance().handleOpenClose();
        expect(wrapper.state(['open'])).toEqual(false);
        wrapper.instance().handleSendAndClose(email);
        expect(getMailMock).toHaveBeenCalledWith(email);
        console.log(wrapper.debug());
    })

})