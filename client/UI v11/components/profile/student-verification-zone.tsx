'use client';

import { useState } from 'react';
import { Folder, Upload } from 'lucide-react';

export function StudentVerificationZone() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      alert('Vui lòng chọn file để xác thực');
      return;
    }
    console.log('Submitting verification:', selectedFile);
  };

  return (
    <div className="bg-white rounded-lg border border-[#C9CFD2] p-6">
      <h2 className="text-xl font-bold text-[#191C1F] mb-6">Xác thực sinh viên</h2>

      {/* Dropzone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-[#1E40AF] bg-blue-50'
            : 'border-[#C9CFD2] bg-[#F2F4F5]'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <Folder size={48} className="text-[#686868]" />
          <p className="text-[#191C1F] font-medium">
            {selectedFile
              ? `Đã chọn: ${selectedFile.name}`
              : 'Tải ảnh lên để xác thực sinh viên'}
          </p>
          <p className="text-sm text-[#686868]">
            Tối đa 5MB, hỗ trợ jpg, jpeg, png
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <label className="flex-1 cursor-pointer">
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="px-6 py-2 border-2 border-[#1E40AF] text-[#1E40AF] rounded-lg font-medium hover:bg-blue-50 transition-colors text-center">
            TẢI ẢNH
          </div>
        </label>

        <button
          onClick={handleSubmit}
          className="flex-1 px-6 py-2 bg-[#1E40AF] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Upload size={18} />
          XÁC THỰC
        </button>
      </div>
    </div>
  );
}
