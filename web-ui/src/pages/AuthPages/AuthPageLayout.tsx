import React from 'react';
import ThemeTogglerTwo from '../../components/common/ThemeTogglerTwo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Left side - Form content (now first in DOM order) */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {children}
      </div>

      {/* Right side - Branding/Image section (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-blue-950 justify-center items-center relative overflow-hidden">
        <div className="text-center z-10">
          <h2 className="text-4xl font-bold text-white">Healthcare Platform</h2>
          <p className="text-lg text-gray-300 mt-2">
            Your trusted partner in healthcare
          </p>
        </div>
        
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff33_1px,transparent_1px),linear-gradient(to_bottom,#ffffff33_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
      </div>

      {/* Theme toggler (fixed position) */}
      <div className="fixed z-50 bottom-6 right-6 sm:block">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
}