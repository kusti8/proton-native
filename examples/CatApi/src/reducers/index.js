import actionConsts from '../consts';

const defaultState = {
  url: '',
  image_id: '',
  type: 'jpg',
  category: '',
  size: 'full',
};

const cats = (state = defaultState, action) => {
  switch (action.type) {
    case actionConsts.CATEGORY:
      return { ...state, category: action.category };
    case actionConsts.SET_ID:
      return { ...state, image_id: action.id };
    case actionConsts.SIZE:
      return { ...state, size: action.size };
    case actionConsts.TYPE:
      return { ...state, type: action.format };
    case actionConsts.URL:
      return { ...state, url: action.url };
    default:
      return state;
  }
};

export default cats;
