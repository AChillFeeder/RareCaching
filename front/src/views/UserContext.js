import React, { createContext, useState, useEffect } from 'react';
import { customGetAllFetch } from './utils/customFetch';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    console.log("in user provider")
    
    useEffect(() => {
        customGetAllFetch('user').then(data => {
            console.log("user data")
            console.log(data)
            if (data && !data.error) {
                console.log("user set");
                console.log(data);
                setUser(data);
            }
        }).catch(error => {
            console.error("Error fetching user:", error);
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
