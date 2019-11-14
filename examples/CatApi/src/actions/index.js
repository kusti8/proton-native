import actionConsts from '../consts';
import fetch from 'node-fetch';
import querystring from 'querystring';
import opn from 'opn';

export const setCategory = category => ({
  type: actionConsts.CATEGORY,
  category,
});

export const setId = id => ({
  type: actionConsts.SET_ID,
  id,
});

export const setSize = size => ({
  type: actionConsts.SIZE,
  size,
});

export const setType = format => ({
  type: actionConsts.TYPE,
  format,
});

export const setUrl = url => ({
  type: actionConsts.URL,
  url,
});

export const setFetching = fetching => ({
  type: actionConsts.FETCHING,
  fetching,
});

const toParams = state => {
  let out = {};
  for (let prop in state) {
    if (state[prop] != '' && prop != 'url') {
      out[prop] = state[prop];
    }
  }
  return out;
};

export const search = () => {
  return (dispatch, getState) => {
    const BASE_URL = 'http://api.thecatapi.com/api/images/get?';
    const str = querystring.stringify(toParams(getState()));
    return fetch(BASE_URL + str, { redirect: 'manual' })
      .then(res => res.headers.get('location'))
      .then(url => {
        dispatch(setUrl(url));
        opn(url);
      });
  };
};
