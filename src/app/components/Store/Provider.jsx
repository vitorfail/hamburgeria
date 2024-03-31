import React from 'react';
import Context from './Context';

const StoreProvider = ({children}) => {
    const token = localStorage.getItem('token_jwt');
    const setToken = (t) => {
        localStorage.setItem('token_jwt', t);
    }
    return(
        <Context.Provider value={
            {token, 
            setToken,}
            }>
            {children}
        </Context.Provider>
    )
}
export default StoreProvider