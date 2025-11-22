import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/mockData';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authAPI.login(email, password);
            setUser(response.user);
            setToken(response.token);

            // Store in localStorage
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);

            return response;
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);
            setUser(response.user);
            setToken(response.token);

            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);

            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    // Demo function to switch roles quickly (for development)
    const switchRole = (role, userId) => {
        const mockUsers = require('../services/mockData').mockUsers;
        const demoUser = mockUsers.find(u => u.role === role && (userId ? u.id === userId : true));

        if (demoUser) {
            const { password, ...userWithoutPassword } = demoUser;
            setUser(userWithoutPassword);
            setToken('demo-token-' + demoUser.id);

            localStorage.setItem('user', JSON.stringify(userWithoutPassword));
            localStorage.setItem('token', 'demo-token-' + demoUser.id);
        }
    };

    const updateUser = (userData) => {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        switchRole,
        updateUser,
        isAuthenticated: !!user,
        isCandidate: user?.role === 'candidate',
        isEmployer: user?.role === 'employer',
        isAdmin: user?.role === 'admin'
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
