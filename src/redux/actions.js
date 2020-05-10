import { ADD_TO_PORTFOLIO, REMOVE_FROM_PORTFOLIO, LOAD_COINS_SUCCESS, LOAD_QUOTES_SUCCESS } from "./actionTypes";
// import { coins, quotes } from './data';

export const loadCoinsSuccess = content => ({
  type: LOAD_COINS_SUCCESS,
  content
});

export const loadQuotesSuccess = content => ({
  type: LOAD_QUOTES_SUCCESS,
  content
});

export const addToPortfolio = content => ({
  type: ADD_TO_PORTFOLIO,
  content
});

export const removeFromPortfolio = content => ({
  type: REMOVE_FROM_PORTFOLIO,
  content
});

export const loadCoins = (size) => {
  return (dispatch) => {
    return fetch('https://www.stackadapt.com/coinmarketcap/map')
      .then((response) => response.json())
      .then((json) => {
        const coins = json.data && json.data.length ? json.data.slice(0, size) : [];
        dispatch(loadCoinsSuccess(coins));
      });
    /* return new Promise((resolve, reject) => {
      resolve(dispatch(loadCoinsSuccess(coins)));
    }); */
  }
};

export const loadQuotes = (coinIds) => {
  return (dispatch) => {
    return fetch(`https://www.stackadapt.com/coinmarketcap/quotes?id=${coinIds.join(",")}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(loadQuotesSuccess(json.data));
      });
    /* return new Promise((resolve, reject) => {
      resolve(dispatch(loadQuotesSuccess(quotes)));
    }); */
  }
};
