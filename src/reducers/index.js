import { combineReducers } from "redux";
import provideReducer from "./provider"

const rootReducer = combineReducers({
    provider: provideReducer
})

export default rootReducer;