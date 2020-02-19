import React from 'react';
import {shallow} from '../../../enzyme';
import {Login} from './Login';
import axiosWrapper from '../../../apis/axiosCreate';
import {mapStateToProps, mapDispatchToProps} from './Login';

describe('snapshot of component', () => {
    it('should match snapshot', () => {
        const dialogStatusMock = jest.fn() 
        const wrapper = shallow(<Login  handleDialogStatus={dialogStatusMock} open={true}/>);
        expect(wrapper).toMatchSnapshot();
        wrapper.find({testData: 'offIcon'}).simulate('click')
        expect(dialogStatusMock).toHaveBeenCalled();
    })
});

describe('test simulate and check functions', () => {
    let mockLogin;
    let dialogStatusMock;

    beforeEach(() => {
        mockLogin = jest.fn().mockImplementationOnce(() => Promise.resolve({}));
        dialogStatusMock = jest.fn() 
    })
    
    it('should simulate admin login', () => {
        const props = {};
        const wrapper = shallow(<Login formUserName='new' handleDialogStatus={dialogStatusMock} login={mockLogin} {...props} open={true}/>);
        wrapper.find({hintText: 'Text'}).simulate('change', {
            target: {
                id: 'userName',
                value: 'yoyogiftg2@gmail.com'
            }
        });
        wrapper.find({hintText: 'password'}).simulate('change', {
            target: {
                id: 'password',
                value: 'password'
            }
        });
        wrapper.find({testData: 'login-button'}).simulate('click');
        const response = { id: 1,
            email: 'yoyogiftg2@gmail.com',
            first_name: 'admin',
            last_name: 'admin',
            picture: '',
            balance_points: 0,
            wishlist: [],
            cards_gifted: [],
            cards_received: [] };
            expect(mockLogin).toHaveBeenCalledWith(response);
        });
        it('should simulate error user', () => {
            
            axiosWrapper.get = jest.fn().mockImplementationOnce(() => Promise.resolve({data: []}))
            const wrapper = shallow(<Login handleDialogStatus={dialogStatusMock} open={true} />);
            wrapper.find({hintText: 'Text'}).simulate('change', {
                target: {
                    id: 'userName',
                    value: 'vishnu@gmail.com'
                }
            });
            wrapper.find({hintText: 'password'}).simulate('change', {
                target: {
                    id: 'password',
                    value: 'password'
                }
            });
            wrapper.find({testData: 'login-button'}).simulate('click');
     });

     it('should simulate user login', async () => {
        axiosWrapper.get = jest.fn().mockImplementationOnce(() => Promise.resolve({data: [{password: 'password'}]}));
        const wrapper = shallow(<Login login={mockLogin} handleDialogStatus={dialogStatusMock}  open={true} />);
        wrapper.find({hintText: 'Text'}).simulate('change', {
            target: {
                id: 'userName',
                value: 'vishnu@gmail.com'
            }
        });
        wrapper.find({hintText: 'password'}).simulate('change', {
            target: {
                id: 'password',
                value: 'password'
            }
        });
        wrapper.find({testData: 'login-button'}).simulate('click');
        await expect(axiosWrapper.get).toHaveBeenCalled();
     });

     it('should google login', async () => {
        axiosWrapper.get = jest.fn().mockImplementationOnce(() => Promise.resolve({data: []}));
        const userCreateMock = jest.fn().mockImplementationOnce(() => Promise.resolve());
        const wrapper = shallow(<Login createUser={userCreateMock} handleDialogStatus={dialogStatusMock} login={mockLogin}  open={true} />);
        wrapper.find({buttonText: "Login Using Google"}).prop('onSuccess')({profileObj: {
            googleId: '122',
            email: 'vishnu',
            givenName: 'vishnu',
            familyName: 'priyan',
            imageUrl: 'nothing'
        }});
        await expect(axiosWrapper.get).toHaveBeenCalled();
     });

     it('should detect already stored user', () => {
        axiosWrapper.get = jest.fn().mockImplementationOnce(() => Promise.resolve({data: [{data: 'data'}]}));
        const wrapper = shallow(<Login handleDialogStatus={dialogStatusMock} login={mockLogin}  open={true} />);
        wrapper.find({buttonText: "Login Using Google"}).prop('onSuccess')({profileObj: {
            googleId: '122',
            email: 'vishnu',
            givenName: 'vishnu',
            familyName: 'priyan',
            imageUrl: 'nothing'
        }});
        // expect(mockLogin).toHaveBeenCalledWith({data: 'data'})
     })
});

describe('check state', () => {
    it('should check mapStateToProps', () => {
        const state = {}
        mapDispatchToProps();
        expect(mapStateToProps(state)).toEqual({})
    })
})