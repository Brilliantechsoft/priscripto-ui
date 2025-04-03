import React from "react";
import PageBreadcrumb from "./PageBreadCrumb";
import PageMeta from "./PageMeta";

interface PageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  children,
  className = "",
}) => {
  return (
    <>
      <PageMeta title={title} description={description} />
      <PageBreadcrumb pageTitle={title} />
      <div className={`space-y-5 sm:space-y-6 ${className}`}>{children}</div>
    </>
  );
};

export default PageLayout; 