import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice";
import requestsReducers from "./requestSlice";

const appStore = configureStore({
    reducer : {
        user : userReducer,
        feed : feedReducer,
        connections : connectionsReducer,
        requests : requestsReducers,
    },
});

export default appStore;