import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../3rd_floor_stateManagement/redux/hooks';

const AuthLayout: React.FC = () => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/books" replace />;
    }

    return (
        <div className="w-full min-h-screen">
            <Outlet />
        </div>
    );
};

export default AuthLayout;