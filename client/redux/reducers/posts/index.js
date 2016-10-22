import * as actionTypes from '../../actionTypes';

const initialState = [];


export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE_APP :
      return action.posts;

    case actionTypes.ADD_POST :
      return [action.post, ...state.posts]; // state is immutable, each change replaces an old object with a new one

    case actionTypes.UPDATE_POST :
      const newStatePosts = state.posts.slice(); // creating new array (removes pointer to old one)
      newStatePosts[action.index] = action.post;
      return newStatePosts; // state is immutable, each change replaces an old object with a new one

    case actionTypes.DELETE_POST :
      return state.posts.filter(post => post._id !== action._id);

    default:
      return state;
  }
}
