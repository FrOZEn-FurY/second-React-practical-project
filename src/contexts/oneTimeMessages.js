import { createContext } from "react";

const messageContext = createContext({
    showOTP: Boolean,
    type: String,
    message: String,
    user: {},
    setStateValues: ()=>{},
});

export default messageContext;