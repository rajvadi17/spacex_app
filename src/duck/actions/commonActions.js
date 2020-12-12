import {
    TOGGLE_MENU,
    SHOW_LIST,
    SHOW_LOADING,
    HIDE_LOADING,
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
    SET_THEME,
    SELECTED_LIST,
    CART_ITEMS,
    REMOVE_ITEM,
    SET_NAVIGATION_DATA
} from '../types/types';

export const toggleMenu = () => (dispatch) => {
  dispatch({
    type: TOGGLE_MENU,
  });
};

export const itemList = (data) => (dispatch) => {
  dispatch({
    type: SHOW_LIST,
    payload: data
  });
};

export const selectedList = (data) => (dispatch) => {

    dispatch({
      type: SELECTED_LIST,
      payload: data
    });
  };

  export const saveCartItems = (data) => (dispatch) => {

      dispatch({
        type: CART_ITEMS,
        payload: data
      });
    };

    export const removeCartItem = (data) => (dispatch) => {

      dispatch({
        type: REMOVE_ITEM,
        payload: data
      });
    };
export const showLoader = () => (dispatch) => {
  dispatch({
    type: SHOW_LOADING,
    payload: true,
  });
};
export const hideLoader = () => (dispatch) => {
  dispatch({
    type: HIDE_LOADING,
    payload: false,
  });
};
export const showNotification = (type, message, description) => (dispatch) => {
  dispatch({
    type: SHOW_NOTIFICATION,
    payload: {
      type, message, description, status: true
    },
  });
};
export const hideNotification = () => (dispatch) => {
  dispatch({
    type: HIDE_NOTIFICATION,
    payload: {
      status: false
    },
  });
};

export const setTheme = (theme) => (dispatch) => {
  dispatch({
    type: SET_THEME,
    payload: theme,
  });
};

export const setNavigationData = (data) => (dispatch) => {
  dispatch({
    type: SET_NAVIGATION_DATA,
    payload: data
  })
};
