import { getCurrentAuthUserThunkCreator } from './auth.reducer';
import { AppDispatch } from './redux-store';
import { actionsTypes } from './store';

type InitialStateType = {
    initialized: boolean;
};

type ActionType = {
    type: typeof actionsTypes.setInitialized;
};

export const initializedSuccessActionCreator = (): ActionType => ({
    type: actionsTypes.setInitialized,
});

export const initializeAppThunkCreator = () => (dispatch: AppDispatch) => {
    dispatch(getCurrentAuthUserThunkCreator()).then(() => {
        dispatch(initializedSuccessActionCreator());
    });
};

const initialState: InitialStateType = {
    initialized: false,
};

export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case actionsTypes.setInitialized:
            return { ...state, initialized: true };

        default:
            return state;
    }
};
