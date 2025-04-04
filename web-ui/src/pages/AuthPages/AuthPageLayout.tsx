import React from "react";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

const DOCTOR_IMAGE_URL =
  "https://images.deccanherald.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticleimages%2F2022%2F05%2F30%2Fdoctor-istock-1113861-1653929086.jpg?auto=format%2Ccompress&fmt=webp&fit=max&format=webp&q=70&w=400&dpr=2";

const PATIENT_IMAGE_URL =
  "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvczc3LW1ja2luc2V5LTE0MjMtcG9tXzQuanBn.jpg";

export default function AuthLayout({
  children,
  isDoctorPage = false,
}: {
  children: React.ReactNode;
  isDoctorPage?: boolean;
}) {
  const imageUrl = isDoctorPage ? DOCTOR_IMAGE_URL : PATIENT_IMAGE_URL;

  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}

        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            {/* <GridShape /> */}
            <div className="flex flex-col items-center">
              <img
                className="relative w-[700px] h-[500px] mb-8 object-cover"
                src={imageUrl}
                alt={isDoctorPage ? "Doctor" : "Patient"}
              />
              <p className="text-center text-gray-400 dark:text-white/60 max-w-[600px] text-xl">
                {isDoctorPage
                  ? "Join our platform to provide exceptional care to patients.Fill out the form to create your account."
                  : "Join our platform to access exceptional healthcare services. Fill out the form to create your account."}
              </p>
            </div>
          </div>
        </div>

        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}

// import React from 'react';
// import ThemeTogglerTwo from '../../components/common/ThemeTogglerTwo';

// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex h-screen">
//       {/* Left side - Form content (now first in DOM order) */}
//       <div className="flex-1 flex flex-col overflow-y-auto">
//         {children}
//       </div>

//       {/* Right side - Branding/Image section (hidden on mobile) */}
//       <div className="hidden lg:flex flex-1 bg-blue-950 justify-center items-center relative overflow-hidden">
//         <div className="text-center z-10">
//           <h2 className="text-4xl font-bold text-white">Healthcare Platform</h2>
//           <p className="text-lg text-gray-300 mt-2">
//             Your trusted partner in healthcare
//           </p>
//         </div>

//         {/* Background grid pattern */}
//         <div className="absolute inset-0 opacity-20">
//           <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff33_1px,transparent_1px),linear-gradient(to_bottom,#ffffff33_1px,transparent_1px)] bg-[size:40px_40px]"></div>
//         </div>
//       </div>

//       {/* Theme toggler (fixed position) */}
//       <div className="fixed z-50 bottom-6 right-6 sm:block">
//         <ThemeTogglerTwo />
//       </div>
//     </div>
//   );
// }
