import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import { multiClientMiddleware } from "redux-axios-middleware";
import rootReducer from "../reducers/index";

const axiosClient = {
    default: {
        client: axios.create({
            baseUrl: process.env.NEXT_PUBLIC_API_URL,
            responseType: 'json',
        })
    }
}

const store = createStore(
    rootReducer,
        applyMiddleware(multiClientMiddleware(axiosClient))
)

export default store;