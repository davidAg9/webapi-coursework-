import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Admin } from '../data/models/admin';
import { Student } from '../data/models/student';


type AuthProviderProps = {
    children: ReactNode,
}


type Authcontext = {
    isAuthenticated: boolean
    user: Admin | Student | null
    login: (email: string, password: string, as: "user" | "admin") => Promise<Admin | Student>
    logout: () => void
}
// Create the authentication context
const AuthContext = createContext({} as Authcontext);



// export function useAuthContext() {
//     return useContext(AuthContext);
// }
// // Create the provider component
// function AuthProvider({ children }: AuthProviderProps) {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [user, setUser] = useState<Admin | Student | null>(() => null);

//     // Define the functions that will be available in the context
//     async function login(email: string, password: string, as: "user" | "admin") {
//         if (as === "user") {
//             setIsAuthenticated(true)

//             return new Student()
//         }

//         if (as === "admin") {
//             setIsAuthenticated(true)

//             return new Admin()

//         }

//         throw Error("Unable to authenticate")

//     };

//     const logout = () => {

//         setIsAuthenticated(false)
//         setUser((_) => null)

//     };

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }
