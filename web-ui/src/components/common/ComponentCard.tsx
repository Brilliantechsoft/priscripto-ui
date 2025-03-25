import React from "react";

interface ComponentCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 ${className}`}>
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default ComponentCard; 