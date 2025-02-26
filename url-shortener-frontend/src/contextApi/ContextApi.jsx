import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
    const getToken = localStorage.getItem('USER_TOKEN')
        ? JSON.parse(localStorage.getItem('USER_TOKEN'))
        : null;

    const [token, setToken] = useState(getToken);

    const sendData = {
        token,
        setToken,
    };

    return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>
};

// Custom hook
export const useStoreContext = () => {
    const context = useContext(ContextApi);
    return context;
}