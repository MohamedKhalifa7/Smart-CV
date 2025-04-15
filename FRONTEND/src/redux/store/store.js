import { configureStore } from "@reduxjs/toolkit";

import { savedCVsSlice } from "./slices/savedCVsSlice";
import { generateContentSlice } from "./slices/generateContentSlice";
const store = configureStore({
    reducer: {
        savedCVs: savedCVsSlice.reducer,
        generateContent: generateContentSlice.reducer,

    }
})

export default store;