import React from 'react';
import { CheckCircle, Camera } from 'lucide-react';

interface ProfileHeaderProps {
  name?: string;
  avatar?: string;
  isVerified?: boolean;
  onAvatarChange?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name = 'Người dùng Uni2hand',
  avatar,
  isVerified = false,
  onAvatarChange,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="relative flex-shrink-0 group">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-[#1E40AF] flex items-center justify-center">
            {avatar ? (
               <img
               src={avatar}
               alt={name}
               className="w-full h-full object-cover"
             />
            ) : (
               <div className="w-full h-full flex items-center justify-center bg-blue-50 text-[#1E40AF] font-bold text-2xl">
                 {name.charAt(0)}
               </div>
            )}
          </div>
          <button
            onClick={onAvatarChange}
            className="absolute bottom-0 right-0 bg-[#1E40AF] text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          >
            <Camera size={16} />
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1 pt-2">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold text-[#191C1F]">{name}</h1>
            {isVerified && (
              <div className="flex items-center gap-1 px-3 py-1 bg-[#F0FDF4] rounded-full border border-[#2DB224]">
                <CheckCircle size={16} className="text-[#2DB224]" />
                <span className="text-xs font-medium text-[#2DB224]">Đã xác thực</span>
              </div>
            )}
          </div>
          <p className="text-[#686868] text-sm font-medium">Thành viên Uni2hand</p>
        </div>
      </div>
    </div>
  );
};
