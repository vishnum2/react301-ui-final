import React from 'react';
import {mapStateToProps, mapDispatchToProps} from './Header';
import {Button} from '@material-ui/core';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Header} from './Header';
import {Provider} from 'react-redux';
import history from "../../common/components/history";
import goTolanding from './Header';
import { shallow, mount } from '../../../enzyme';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe('check mapStateToProps', () => {
    it('checks return of mapStateToProps', () => {
        const state = {
            login: {
                loginStatus: true,
                detailsObject: {}
            }
        };
        mapDispatchToProps();
        const response = {
            isLoggedIn: state.login.loginStatus,
            userDetails: state.login.detailsObject
        };
        expect(mapStateToProps(state)).toEqual(response);
    });
});

describe('check the snackbar', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    it('should show snackbar if state is true', () => {
        const wrapper = mount(<Provider store={store}><Header isLoggedIn={false} classes={{}}/></Provider>);
        wrapper.find('Header').setState({showErrorSnack: true});
        // console.log(wrapper.debug());
        expect(wrapper.find('MySnackBar')).toHaveLength(1);
        
    });
    it('should not show snackbar if state is false', () => {
        const wrapper = mount(<Provider store={store}><Header classes={{}}/></Provider>);
        wrapper.find('Header').setState({showErrorSnack: false});
        // console.log(wrapper.debug());
        expect(wrapper.find('MySnackBar')).toHaveLength(0);
    });

    // it('should call the function on click', () => {
    //     const mockCallBack = jest.fn();

    //     const button = shallow((<Button onClick={mockCallBack}>Ok!</Button>));
    //     console.log(button.debug());
    //     button.simulate('click');
    //     expect(mockCallBack.mock.calls.length).toEqual(1);

    // })
});

describe('snapshot of component', () => {
    it('should match snapshot', () => {
        history.push = jest.fn();
        window.sessionStorage.setItem('usertype', 'admin');
        const wrapper = shallow(<Header logout={jest.fn()} isLoggedIn={true} classes={{}}/>);
        expect(wrapper).toMatchSnapshot();
        wrapper.find({testData: 'componentsOnLoggedInForAdmin'}).simulate('click');
        expect(history.push).toHaveBeenCalledWith('/AllUsers');
        wrapper.find({testData1: 'giftsSent'}).simulate('click');
        expect(history.push).toHaveBeenCalledWith('/GiftsSend');
        wrapper.find({testData1: 'giftsReceived'}).simulate('click');
        expect(history.push).toHaveBeenCalledWith('/GiftsReceived');
        wrapper.find({testData1: 'myprofile'}).simulate('click');
        expect(history.push).toHaveBeenCalledWith('/Profile');
        wrapper.find({testData: 'loginButton'}).simulate('click');
        expect(history.push).toHaveBeenCalledWith('/');
        wrapper.find({testData: 'goToLandingPage'}).simulate('click');
        expect(history.push).toHaveBeenCalledWith('/');
        // console.log(wrapper.debug())
        // expect(wrapper.find({testData: 'componentsOnLoggedInForAdmin'}).text()).toEqual("ALL USERS");
    })
});

describe('check button when logged in', () => {
    it('should render buttons when logged in', () => {
        const wrapper = shallow(<Header classes={{}} isLoggedIn= {true}/>);
        expect(wrapper.find({testData: 'componentsOnLoggedIn'})).toHaveLength(3);
    });
});

describe('check login button', () => {
    it('should be login button when not logged in',async () => {
        const wrapper = shallow(<Header classes={{}} isLoggedIn= {false}/>);
        wrapper.find({testData: 'loginButton'}).simulate('click');
        // await expect(wrapper.state(['loginDialog'])).toBe(true);
        wrapper.setState({loginDialog: true});
        wrapper.find({testData: 'loginDialog'}).prop('handleDialogStatus')(true);
    })
})

// describe('check goToLandingPage', () => {
//     it('checks if properly routed to lading page', () => {
//         const historyMocks = {push: jest.fn()};
//         const wrapper = shallow(<Header classes={{}} isLoggedIn={true} history={historyMocks}/>);
//         wrapper.find({testData: 'goToLandingPage'}).simulate('click')
//         console.log(historyMocks.push.mock.calls[0]);
//         expect(historyMocks.push).toHaveBeenCalled();
//         // console.log(wrapper.instance().goTolanding());
//     })
// })

// describe('check function called', () => {
//     it('should call the function on click', () => {
//         const wrapper = mount(<Header classes={{}} isLoggedIn={true}/>);
//         console.log(wrapper.instance());
//         wrapper.find({testData: 'componentsOnLoggedIn'}).simulate('click');

//     })
// })
