import { configureStore } from "@reduxjs/toolkit";

import { savedCVsSlice } from "./slices/savedCVsSlice";

const store = configureStore({
    reducer: {
        savedCVs: savedCVsSlice.reducer,
    }
})

export default store;