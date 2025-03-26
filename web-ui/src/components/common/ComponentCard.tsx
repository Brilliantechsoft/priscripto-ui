<<<<<<< HEAD
import React from "react";

interface ComponentCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
=======
interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
>>>>>>> dd3918da7b52a53b4efc0026bb7e9b4544c3767d
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
<<<<<<< HEAD
}) => {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 ${className}`}>
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      {children}
=======
  desc = "",
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          {title}
        </h3>
        {desc && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {desc}
          </p>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
>>>>>>> dd3918da7b52a53b4efc0026bb7e9b4544c3767d
    </div>
  );
};

<<<<<<< HEAD
export default ComponentCard; 
=======
export default ComponentCard;
>>>>>>> dd3918da7b52a53b4efc0026bb7e9b4544c3767d
