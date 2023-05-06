import { configureStore } from "@reduxjs/toolkit"
import { DataReducer } from "./redux/reducer"
export const store = configureStore({
    reducer: {
        User_Register: DataReducer

    }
})




