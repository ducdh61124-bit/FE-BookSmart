import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../3rd_floor_stateManagement/redux/hooks';

export const authStyles = {
    title: "!text-[#FFB400] !font-sans !tracking-[2px] !uppercase !mb-8 !text-2xl !font-bold",
    input: "!bg-white/10 !border-none !text-white !p-3 placeholder:!text-white/50 hover:!bg-white/20 focus:!bg-white/20",
    goldBtn: "!bg-transparent !border-2 !border-[#FFB400] !text-[#FFB400] !h-[50px] !w-full hover:!bg-[#FFB400] hover:!text-black",
    link: "text-white/60 hover:text-[#FFB400] cursor-pointer hover:underline transition-all duration-300 select-none",
    secondaryText: "text-white/60 text-sm block mb-6"
};

const AuthLayout: React.FC = () => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/books" replace />;
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-no-repeat bg-center bg-cover"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://img.pikbest.com/ai/illus_our/20230414/109d266ed0b1a0a5463b7ac23c80df53.jpg!w700wp')`
            }}
        >
            <div className="bg-[#141414]/85 backdrop-blur-[10px] p-10 w-full max-w-[450px] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] text-center rounded-2xl">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;