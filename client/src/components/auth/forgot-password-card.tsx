'use client';

import { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ForgotPasswordCard() {
  const [step, setStep] = useState<'verification' | 'reset'>('verification');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sendCodeDisabled, setSendCodeDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSendCode = () => {
    if (!email) {
      alert('Vui lòng nhập email sinh viên');
      return;
    }
    
    if (!email.includes('.edu.vn')) {
      alert('Email phải có định dạng .edu.vn');
      return;
    }

    setSendCodeDisabled(true);
    setCountdown(60);

    // Simulate sending code
    console.log('OTP sent to:', email);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSendCodeDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp) {
      alert('Vui lòng nhập mã xác thực');
      return;
    }

    // Simulate code verification
    console.log('Code verified:', otp);
    setStep('reset');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      alert('Vui lòng nhập đầy đủ mật khẩu');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Mật khẩu không trùng khớp');
      return;
    }

    console.log('Password reset for:', email);
    alert('Mật khẩu đã được thiết lập thành công!');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center mb-8">
        <Link to="/" className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#191C1F] flex items-center justify-center mb-2">
                <div className="w-8 h-8 rounded-full border border-[#191C1F]" />
            </div>
            <h1 className="text-2xl font-bold text-[#191C1F]">Uni2hand</h1>
        </Link>
      </div>

      {/* Card */}
      <div className="bg-[#FFFFFF] rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="border-b border-[#C9CFD2] pb-4 mb-6">
          <h2 className="text-xl font-bold text-[#191C1F]">Quên mật khẩu</h2>
        </div>

        {/* Step 3A: Verification */}
        {step === 'verification' && (
          <form onSubmit={handleVerifyCode}>
            {/* Email Input with Send Code Button */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#191C1F] mb-2">
                Email sinh viên
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email sinh viên"
                  className="w-full border border-[#C9CFD2] rounded-lg px-4 py-3 text-[#191C1F] placeholder-[#77878F] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={sendCodeDisabled}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 font-semibold text-sm transition ${
                    sendCodeDisabled
                      ? 'text-[#C9CFD2] cursor-not-allowed'
                      : 'text-[#1E40AF] hover:text-[#1530a0]'
                  }`}
                >
                  {sendCodeDisabled ? `Gửi lại (${countdown}s)` : 'Gửi mã'}
                </button>
              </div>
            </div>

            {/* OTP Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#191C1F] mb-2">
                Nhập mã
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Nhập mã xác thực nhận được từ email"
                maxLength={6}
                className="w-full border border-[#C9CFD2] rounded-lg px-4 py-3 text-[#191C1F] placeholder-[#77878F] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent tracking-widest text-center"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1E40AF] text-[#FFFFFF] font-bold py-3 px-4 rounded-lg hover:bg-[#1530a0] transition flex items-center justify-center gap-2"
            >
              XÁC NHẬN
              <ArrowRight size={20} />
            </button>
          </form>
        )}

        {/* Step 3B: Reset Password */}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword}>
            {/* New Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#191C1F] mb-2">
                Mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới"
                  className="w-full border border-[#C9CFD2] rounded-lg px-4 py-3 text-[#191C1F] placeholder-[#77878F] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77878F] hover:text-[#191C1F] transition"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#191C1F] mb-2">
                Xác nhận mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Xác nhận mật khẩu mới"
                  className="w-full border border-[#C9CFD2] rounded-lg px-4 py-3 text-[#191C1F] placeholder-[#77878F] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77878F] hover:text-[#191C1F] transition"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1E40AF] text-[#FFFFFF] font-bold py-3 px-4 rounded-lg hover:bg-[#1530a0] transition flex items-center justify-center gap-2"
            >
              XÁC NHẬN
              <ArrowRight size={20} />
            </button>
          </form>
        )}
      </div>

      {/* Footer Links */}
      <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-[#C9CFD2]">
        <Link
          to="/login"
          className="text-[#1E40AF] hover:underline transition text-sm font-medium"
        >
          Quay lại Đăng nhập
        </Link>
      </div>
    </div>
  );
}
