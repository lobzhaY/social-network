import { actionsTypes } from './store';
import { getCurrentAuthUserThunkCreator } from './users-reducer';

const initialState = {
    initialized: false,
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.setInitialized:
            return { ...state, initialized: true };

        default:
            return state;
    }
};

export const initializedSuccessActionCreator = () => ({
  type: actionsTypes.setInitialized,
});

export const initializeAppThunkCreator = () => (dispatch) => {
  dispatch(getCurrentAuthUserThunkCreator()).then(() => {
    dispatch(initializedSuccessActionCreator())
  })
};
