import { configureStore } from "@reduxjs/toolkit";

import { savedCVsSlice } from "./slices/savedCVsSlice";
import { generateContentSlice } from "./slices/generateContentSlice";
import { cvTemplateSlice } from "./slices/cvTemplateSlice";
const store = configureStore({
    reducer: {
        savedCVs: savedCVsSlice.reducer,
        generateContent: generateContentSlice.reducer,
        cvTemplate: cvTemplateSlice.reducer,
    }
})

export default store;