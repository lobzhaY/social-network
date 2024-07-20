import { getCurrentAuthUserThunkCreator } from './auth.reducer';
import { actionsTypes } from './store';

export const initializedSuccessActionCreator = () => ({
  type: actionsTypes.setInitialized,
});

export const initializeAppThunkCreator = () => (dispatch) => {
  dispatch(getCurrentAuthUserThunkCreator()).then(() => {
      dispatch(initializedSuccessActionCreator());
  });
};

const initialState = {
    initialized: false,
    globalError: false,
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.setInitialized:
            return { ...state, initialized: true };

        default:
            return state;
    }
};
