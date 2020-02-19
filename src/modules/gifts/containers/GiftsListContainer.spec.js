import React from 'react';
import {shallow, mount} from '../../../enzyme';
import {GiftsListContainer} from './GiftsListContainer';
import {mapStateToProps} from './GiftsListContainer';
import history from "../../common/components/history";

const card = [{
    "id": "5e491e593e45c62729dece4b",
    "cardName": "MEDIOT",
    "cardPoints": 777,
    "cardCategory": "Food",
    "cardRetailer": "Uber",
    "cardIssueDate": "Sunday, November 13, 2016 1:12 AM",
    "cardExpiryDate": "Saturday, February 8, 2020 12:38 AM",
    "cardCount": 537,
    "cardImage": "https://d2e70e9yced57e.cloudfront.net/wallethub/posts/68808/best-gift-cards.png",
    "cardVendor": "Foodpanda",
    "cardShortDesc": "10% OFF",
    "cardLongDesc": "Gift Cards are the Perfect Gift, Every Time. Use the  Gift Card to shop from millions of items  Goods and everything in-between.  Gift Cards never expire and have no fees. Use it to shop now or wait for the deal of a lifetime."
  }]
describe('snapshot', () => {
    it('should do snapshot test', () => {
        const wrapper = shallow(<GiftsListContainer fetchCards={jest.fn()} userDetails={{email: 'yoyogiftg2@gmail.com'}} giftCards={[]} />);
        expect(wrapper).toMatchSnapshot();
        const error = new Error('test');
        wrapper.simulateError(error);
    })
});

describe('test mapStateToProps', () => {
    it('should return proper object', () => {
        const state = {
            gifts: {
                gitfCard: {},
                giftCardsFiltered: {}
            },
            login: {
                detailsObject: {},
            }
        };

        const response = {
            giftCards: state.gifts.giftCards,
            giftCardsFiltered: state.gifts.giftCardsFiltered,
            userDetails: state.login.detailsObject
          };
        expect(mapStateToProps(state)).toEqual(response);
    });
});

describe('show tooltip', () => {
    it('should show tooltip', () => {
        const wrapper = shallow(<GiftsListContainer fetchCards={jest.fn()} userDetails={{}} giftCards={card} />);
        // console.log(wrapper.state(['sortByValue']));
        wrapper.setState({sortByValue: 'Validity'});
        expect(wrapper.state(['sortByValue'])).toEqual('Validity');
        wrapper.setState({sortOrder: false});
        expect(wrapper.state(['sortOrder'])).toEqual(false);
        wrapper.setState({sortByValue: ''});
        expect(wrapper.state(['sortByValue'])).toEqual('');
    });
})

describe('simulate click functions', () => {
    it('should initiate sort function', () => {
        const wrapper = shallow(<GiftsListContainer fetchCards={jest.fn()} userDetails={{}} fetchCardFilter={jest.fn()} giftCards={card} />);

        wrapper.setState({sortByValue: true}, () => {
        wrapper.find({testData: 'Icon1'}).simulate('click');
        wrapper.update();
        expect(wrapper.state(['sortOrder'])).toEqual(true);
        });
    });

    it('should call onchange retailer function', () => {
        const mockFn = jest.fn();
        const wrapper = shallow(<GiftsListContainer fetchCards={jest.fn()} userDetails={{}} fetchCardFilter={mockFn} giftCards={card} />);
        // console.log(wrapper.find({testData: 'filterByRetailerTest'}).debug());
        const ev = {
            target: {
                value: 'All'
            }
        }
        // console.log(wrapper.instance())
        wrapper.instance().onChangeRetailer({target: {value: 'Uber'}});
        expect(mockFn).toHaveBeenCalledWith(card);
        wrapper.instance().onChangeRetailer(ev);
        expect(mockFn).toHaveBeenCalledWith(card);
    });

    it('should simulate onchange sort function', () => {
        const mockFn = jest.fn();
        let ev;
        const wrapper = shallow(<GiftsListContainer giftCardsFiltered={card} fetchCards={jest.fn()} userDetails={{}} fetchCardFilter={mockFn} giftCards={card} />);
        ev = {
            target: {
                value: 'Points'
            }
        }
        wrapper.setState({filterValue: 'filter'});
        wrapper.instance().onChangeSort(ev);
        expect(mockFn).toHaveBeenCalledWith(card);
        wrapper.setState({sortOrder: false});
        wrapper.instance().onChangeSort(ev);
        expect(mockFn).toHaveBeenCalledWith(card);
        ev = {
            target: {
                value: 'Count'
            }
        }
        wrapper.instance().onChangeSort(ev);
        expect(mockFn).toHaveBeenCalledWith(card);
        wrapper.setState({sortOrder: false});
        wrapper.instance().onChangeSort(ev);
        expect(mockFn).toHaveBeenCalledWith(card);
        ev = {
            target: {
                value: 'Validity'
            }
        }
        wrapper.instance().onChangeSort(ev);
        expect(mockFn).toHaveBeenCalledWith(card);
        wrapper.setState({sortOrder: false});
        wrapper.instance().onChangeSort(ev);
        expect(mockFn).toHaveBeenCalledWith(card);

    });

    it('should simulate the addUpdateform', () => {
        const mockFn = jest.fn();
        const mockker = history.push = jest.fn();
        const wrapper = shallow(<GiftsListContainer giftCardsFiltered={card} fetchCards={jest.fn()} userDetails={{email: 'yoyogiftg2@gmail.com'}} fetchCardFilter={mockFn} giftCards={card} />);
        wrapper.find({testData: 'addCardButtonTest'}).simulate('click');
        expect(mockker).toHaveBeenCalledWith('/AddUpdateForm');
    });

    it('should simulate searchValue Change', () => {
        jest.useFakeTimers();
        const mockFn = jest.fn().mockImplementation(() => console.log('mockFn Implemented'));
        const wrapper = shallow(<GiftsListContainer giftCardsFiltered={card} fetchCards={jest.fn()} userDetails={{email: 'yoyogiftg2@gmail.com'}} fetchCardFilter={mockFn} giftCards={card} />);
        console.log(wrapper.find({name: 'SearchBar'}).debug());
        wrapper.find({name: 'SearchBar'}).simulate('change', {target: {value: ''}});
        jest.runAllTimers();
        wrapper.find({name: 'SearchBar'}).simulate('change', {target: {value: 'Uber'}});
        jest.runAllTimers();
        expect(setTimeout).toHaveBeenCalledTimes(2);
    })
});

