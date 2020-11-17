import commonReducer from './commonReducer';
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  commonReducer
})
export default createRootReducer