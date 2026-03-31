import React from 'react';
import { AuthCard } from '../../components/auth/auth-card';
import { BlobBackground } from '../../components/auth/blob-background';
import { DecorationShape } from '../../components/auth/decoration-shape';

const Login: React.FC = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            <BlobBackground />
            <DecorationShape />
            <AuthCard initialTab="login" />
        </div>
    );
};

export default Login;
