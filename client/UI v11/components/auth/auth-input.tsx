'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AuthInputProps {
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  showPasswordToggle?: boolean;
}

export function AuthInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  showPasswordToggle = false,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-[#191C1F] mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full px-4 py-3 border border-[#C9CFD2] rounded-lg text-[#191C1F] placeholder-[#686868] focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF] transition"
        />
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#686868] hover:text-[#191C1F] transition"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
