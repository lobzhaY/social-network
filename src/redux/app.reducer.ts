import { getCurrentAuthUserThunkCreator } from './auth.reducer';
import { AppDispatch, GetActionsTypes } from './redux-store';
import { actionsTypes } from './store';

type InitialStateType = typeof initialState;

type ActionsType = GetActionsTypes<typeof actions>;

const initialState = {
    initialized: false,
};

const actions = {
    initializedSuccessActionCreator: () =>
        ({
            type: actionsTypes.setInitialized,
        }) as const,
};

export const initializeAppThunkCreator = () => (dispatch: AppDispatch) => {
    dispatch(getCurrentAuthUserThunkCreator()).then(() => {
        dispatch(actions.initializedSuccessActionCreator());
    });
};

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case actionsTypes.setInitialized:
            return { ...state, initialized: true };

        default:
            return state;
    }
};
