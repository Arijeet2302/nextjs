"use client"
import store from "./store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function Providers({ children }) {

    const storeRef = useRef();
    if (!storeRef.current) {
        storeRef.current = store;// create store once
    }
    return (
        <Provider store={storeRef.current}>{children}</Provider>
    )
}   
