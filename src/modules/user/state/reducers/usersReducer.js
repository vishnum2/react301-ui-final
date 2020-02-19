import {
  RECEIVED_CARDS,
  SENT_CARDS,
  USER_DETAILS,
  REDEEM_CARD,
  UPDATE_BALANCE,
  UPDATE_TRANSACT
} from "./../actions/types";
const INITIAL_STATE = {
  cards: [],
  UserDetails: []
};
const usersReducer = (state = INITIAL_STATE, action) => {
  let id = null;
  switch (action.type) {
    case RECEIVED_CARDS:
      state = { ...state, cards: action.payload };
      break;

    case SENT_CARDS:
      state = { ...state, cards: action.payload };
      break;

    case USER_DETAILS:
      state = { ...state, UserDetails: action.payload };
      break;

    case REDEEM_CARD:
      id = action.payload.id;
      state.cards = state.cards.map(card => {
        if (card.id === id) {
          const tempObj = { ...card, isRedeemed: true };
          return tempObj;
        } else {
          return card;
        }
      });
      break;

    case UPDATE_BALANCE:
      state = { ...state, UserDetails: action.payload };
      break;

    case UPDATE_TRANSACT:
      state = { ...state, cards: action.payload };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default usersReducer;
