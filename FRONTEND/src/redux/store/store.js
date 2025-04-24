import { configureStore } from "@reduxjs/toolkit";

import { savedCVsSlice } from "./slices/savedCVsSlice";
import { generateContentSlice } from "./slices/generateContentSlice";
import { cvTemplateSlice } from "./slices/cvTemplateSlice";
import { cvScoreSlice } from "./slices/cvScoreSlice";
import { cvAnalyzeSlice } from "./slices/cvAnalyzeSlice";
const store = configureStore({
    reducer: {
        savedCVs: savedCVsSlice.reducer,
        generateContent: generateContentSlice.reducer,
        cvTemplate: cvTemplateSlice.reducer,
        cvScore: cvScoreSlice.reducer,
        cvAnalyze: cvAnalyzeSlice.reducer,
        
    }
})

export default store;