'use client';

interface AuthTabsProps {
  activeTab: 'login' | 'register';
  onTabChange: (tab: 'login' | 'register') => void;
}

export function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
  return (
    <div className="flex gap-0 mb-8 border-b border-[#C9CFD2]">
      <button
        onClick={() => onTabChange('login')}
        className={`flex-1 py-4 text-center text-xl font-bold transition-colors ${
          activeTab === 'login'
            ? 'text-[#191C1F] border-b-2 border-[#1E40AF]'
            : 'text-[#686868] hover:text-[#191C1F]'
        }`}
      >
        Đăng nhập
      </button>
      <button
        onClick={() => onTabChange('register')}
        className={`flex-1 py-4 text-center text-xl font-bold transition-colors ${
          activeTab === 'register'
            ? 'text-[#191C1F] border-b-2 border-[#1E40AF]'
            : 'text-[#686868] hover:text-[#191C1F]'
        }`}
      >
        Đăng ký
      </button>
    </div>
  );
}
