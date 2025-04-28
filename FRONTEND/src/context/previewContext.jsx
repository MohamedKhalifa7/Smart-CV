// src/context/previewContext.js
import { createContext, useContext, useState } from 'react';

const PreviewContext = createContext();

export const usePreview = () => useContext(PreviewContext);

export const PreviewProvider = ({ children }) => {
  const [goToPreview, setGoToPreview] = useState(false);

  return (
    <PreviewContext.Provider value={{ goToPreview, setGoToPreview }}>
      {children}
    </PreviewContext.Provider>
  );
};
