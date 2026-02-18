import {createContext, useState, useEffect, ReactNode, useContext} from "react";
import {getUsernameByToken, handleAxiosError, login, validate} from "./actions";
import {LoginProp, UsernameProp, ValidateProp} from "./propinterfaces";
import {setCookie, getCookie, removeCookie} from 'typescript-cookie';

interface AuthContextType {
    isAuthenticated: boolean | undefined;
    login: (formData: LoginProp) => Promise<string>;
    logout: () => void;
    checkUsername: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

    // Update useEffect to redirect when authenticated
    useEffect(() => {
        const checkAuth = async () => {

            try {
                const username : string = await getUsernameByToken();
                console.log("Username in auth provider: " + username);
                if (!username) {
                    setIsAuthenticated(false);
                    return;
                }

                const validateForm: ValidateProp = {
                    username: username
                };
                const response = await validate(validateForm);

                if (response) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }

            } catch (err) {
                console.error("Validation error:", err);
                setIsAuthenticated(false);
            }

        };

        checkAuth();
    }, []);

    useEffect(() => {
        console.log("Authentication State Changed:", isAuthenticated);
    }, [isAuthenticated]);

    const handleLogin = async (formData: LoginProp): Promise<string> => {
    
        const jwt = await login(formData);
        if (jwt) {
            setCookie('token', jwt, {expires: 1, path: "/"});
            sessionStorage.setItem("curUn", formData.username);
            setIsAuthenticated(true);
            console.log(jwt);
            return jwt;
        }
        return "Incorrect email or password";    
        
    };

    const handleLogout = () => {
        removeCookie("token");
        sessionStorage.clear();
        setIsAuthenticated(false);
    };

    const checkUsername = async () => {

        setIsAuthenticated(undefined);

        const cached = sessionStorage.getItem("curUn");
        if (cached) {
            setIsAuthenticated(true);
            return;
        }

        const username : string = await getUsernameByToken();
        console.log(`Checking username : ${username}`)
        if (username) {
            sessionStorage.setItem("curUn", username);
            setIsAuthenticated(true);
        } else {
            sessionStorage.clear();
            setIsAuthenticated(false);
        }
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login: handleLogin, logout: handleLogout, checkUsername: checkUsername}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
