import React, { createContext, useContext, useState } from "react";
//import { removeToken, saveUserInfo } from "../utils";
//import useSnackbar from "../custom-hooks/useSnackbar";
//import { nmsChangePassword, nmsLoginApi } from "../service/nms-service";

const AuthContext = createContext();

export const AuthProvider = ({ children, onLoginSuccess }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState("");
    //const { openSnackbar, SnackbarComponent } = useSnackbar();

    // const login = async (credentials) => {
    //     try {
    //         const response = await nmsLoginApi(credentials);
    //         const token = response.token;
    //         const role = response.role;
    //         const userName = response.userName;
    //         if (response.message.includes("successfully")) {
    //             saveUserInfo(token, role, userName);
    //             if (response.role) {
    //                 setRole(response.role);
    //             }

    //             openSnackbar(response.message, "success");

    //             if (onLoginSuccess) {
    //                 onLoginSuccess();
    //             }

    //             return response;
    //         } else {
    //             openSnackbar(response.message, "error");
    //         }
    //     } catch (error) {
    //         console.error("Login error:", error);
    //         openSnackbar(
    //             error.response ? error.response.message : "Login failed",
    //             "error"
    //         );
    //     }
    // };

    // const logout = () => {
    //     try {
    //         removeToken();
    //         setUser(null);
    //         setRole("");
    //         openSnackbar("User successfully logged out.", "success");
    //         return true;
    //     } catch (error) {
    //         console.error("Logout error:", error);
    //         openSnackbar("Logout failed", "error");
    //     }
    // };

    // const changePassword = async (userFields) => {
    //     const response = await nmsChangePassword(userFields);

    //     if (response.message.includes("successfully")) {
    //         openSnackbar(response.message, "success");
    //     } else {
    //         openSnackbar(response.message, "error");
    //     }
    //     return response;
    // };

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                //login,
                //logout,
                //changePassword,
            }}
        >
            {children}
            {/* <SnackbarComponent /> */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

// const fetchUserData = async (token) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (token === "mock-token") {
//                 resolve({ name: "John Doe", email: "john@example.com" });
//             } else {
//                 reject({ response: { data: { message: "Invalid token" } } });
//             }
//         }, 1000);
//     });
// };
