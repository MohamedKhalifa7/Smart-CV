import React, { createContext, useContext, useState } from 'react';

const TemplateContext = createContext();

export const TemplateProvider = ({ children }) => {
    const [choosenTemp, setChoosenTemp] = useState('classic');

    return (
        <TemplateContext.Provider value={{ choosenTemp, setChoosenTemp }}>
            {children}
        </TemplateContext.Provider>
    )
}

export const useTemplate = () => useContext(TemplateContext);
