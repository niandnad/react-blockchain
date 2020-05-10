import { ADD_TO_PORTFOLIO, REMOVE_FROM_PORTFOLIO, LOAD_COINS_SUCCESS, LOAD_QUOTES_SUCCESS } from "../actionTypes";

const initialState = {
  coins: [], // 20
  portfolio: [], // initially 5,
  loading: true
};
/** 
 {
   id: Number,
   symbol: String,
   rank: Number,
   price: Number
 }
*/

export default function (state = initialState, action) {
  switch (action.type) {

    case LOAD_COINS_SUCCESS: {
      const portfolio = action.content.slice(0, 5);
      const coins = action.content.slice(5);
      return {
        ...state,
        coins: coins,
        portfolio: portfolio,
        loading: false
      };
    }

    case LOAD_QUOTES_SUCCESS: {
      const coinMap = action.content;
      return {
        ...state,
        portfolio: state.portfolio.map((coin) => {
          const id = coin.id;
          const price = (coinMap.hasOwnProperty(id) && coinMap[id].quote.USD.price) || 'NA';
          return {
            ...coin,
            price: price
          };
        }),
        loading: false
      };
    }

    case ADD_TO_PORTFOLIO: {
      return {
        ...state,
        portfolio: [...state.portfolio, action.content],
        coins: state.coins.filter((coin) => coin.id !== action.content.id)
      };
    }

    case REMOVE_FROM_PORTFOLIO: {
      return {
        ...state,
        portfolio: state.portfolio.filter((coin) => coin.id !== action.content.id),
        coins: [...state.coins, action.content]
      };
    }

    default:
      return {
        ...state,
        loading: true
      };
  }
}
