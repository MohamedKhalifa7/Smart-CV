import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

const TemplateContext = createContext();

export const TemplateProvider = ({ children }) => {
    const [choosenTemp, setChoosenTemp] = useState(()=>{
        return localStorage.getItem("choosenTemp"||"classic-cv")
    });

    useEffect(()=>{
        localStorage.setItem('choosenTemp',choosenTemp)
    },[choosenTemp])

    return (
        <TemplateContext.Provider value={{ choosenTemp, setChoosenTemp }}>
            {children}
        </TemplateContext.Provider>
    )
}

export const useTemplate = () => useContext(TemplateContext);
