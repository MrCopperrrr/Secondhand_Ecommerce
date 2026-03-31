import React from 'react';
import { ForgotPasswordCard } from '../../components/auth/forgot-password-card';
import { BlobBackground } from '../../components/auth/blob-background';
import { DecorationShape } from '../../components/auth/decoration-shape';

const ForgotPassword: React.FC = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            <BlobBackground />
            <DecorationShape />
            <ForgotPasswordCard />
        </div>
    );
};

export default ForgotPassword;
