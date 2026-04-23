import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

/**
 * Provides centralized auth state and actions (login, logout) to all components.
 * Replaces scattered localStorage reads and duplicated logout logic.
 */
export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState(() => {
        // Initialize from localStorage on first load
        const token = localStorage.getItem('jwt_token');
        return {
            isAuthenticated: !!token,
            token: token,
            userId: localStorage.getItem('user_id'),
            userName: localStorage.getItem('user_name'),
            userRole: localStorage.getItem('user_role'),
        };
    });

    const login = useCallback(({ token, id, name, role }) => {
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_id', id);
        localStorage.setItem('user_name', name);
        localStorage.setItem('user_role', role);

        setAuthState({
            isAuthenticated: true,
            token,
            userId: id,
            userName: name,
            userRole: role,
        });
    }, []);

    const logout = useCallback(() => {
        localStorage.clear();
        setAuthState({
            isAuthenticated: false,
            token: null,
            userId: null,
            userName: null,
            userRole: null,
        });
    }, []);

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook to access auth state and actions.
 * Usage: const { isAuthenticated, userRole, login, logout } = useAuth();
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
