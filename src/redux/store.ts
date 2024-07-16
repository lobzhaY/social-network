export type ActionType = { type: string; payload?: string };

export const actionsTypes = {
    addPost: '/profile/ADD_POST',
    addMessage: '/message/ADD_MESSAGE',
    setUsers: '/users/SET_USERS',
    followUser: '/users/FOLLOW_USER',
    unfollowUser: '/users/UNFOLLOW_USER',
    setCurrentPage: '/users/SET_CURRENT_PAGE',
    setTotalUsersCount: '/users/SET_TOTAL_USERS_COUNT',
    toggleIsFetching: '/users/TOGGLE_IS_FETCHING',
    setUserProfile: '/profile/SET_USER_PROFILE',
    setUserData: '/auth/SET_USER_DATA',
    toggleIsProgressRequest: '/users/TOGGLE_IS_PROGRESS_REQUEST',
    getUserStatus: '/profile/GET_USER_STATUS',
    updateUserStatus: '/profile/UPDATE_USER_STATUS',
    setInitialized: '/app/SET_INITIALIZED',
    deletePost: '/profile/DELETE_POST',
    saveUserPhoto: '/profile/SAVE_USER_PHOTO_SUCCESS',
    getCaptchaUrl: '/auth/GET_CAPTCHA_URL'
};
