import { createContext, useContext } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children, loggedUser, handleLogout }) {
    console.log(loggedUser, 'in userProvider');

    return (
        <UserContext.Provider value={{ loggedUser, handleLogout }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}