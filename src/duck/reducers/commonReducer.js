import {
  TOGGLE_MENU,
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  SET_THEME,
  SHOW_LIST,
  CART_ITEMS,
  REMOVE_ITEM,
  SET_NAVIGATION_DATA,
  SELECTED_LIST,
} from "../types/types";
import { getTheme } from "../../utils/commonUtils";

const initialState = {
  showLoading: false,
  notification: {
    type: "",
    message: "",
    description: "",
    status: false,
  },
  theme: getTheme(),
  navigationData: {},
  isMenuCollapsed: true,
  pizzaList: [],
  selectedItems: [],
  cartItems: []
};

export default (state = initialState, action) => {
  debugger;
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        isMenuCollapsed: !state.isMenuCollapsed,
      };
    case SHOW_LOADING:
      return {
        ...state,
        showLoading: action.payload,
      };
    case HIDE_LOADING:
      return {
        ...state,
        showLoading: action.payload,
      };
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notification: {
          status: true,
          ...action.payload,
        },
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        notification: {
          status: false,
        },
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case SET_NAVIGATION_DATA:
      return {
        ...state,
        navigationData: action.payload,
      };
      
    case SHOW_LIST: 
    return {
      ...state,
      pizzaList: action.payload
    }
    case SELECTED_LIST: 
    return {
      ...state,
      selectedItems: action.payload
    }
    case CART_ITEMS: 
    if (state.cartItems.indexOf(action.payload.id) === -1){
    return {
      ...state,
      cartItems: [...state.cartItems, action.payload]
    }
   } else {
      return {
        ...state
      } 
    }
    case REMOVE_ITEM: return{
      ...state,
      cartItems: state.cartItems.filter((obj) => obj.cartId != action.payload.cartId)
    }
    default:
      return state;
  }
};
