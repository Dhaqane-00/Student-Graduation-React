import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  headerslot?: ReactNode;
  className?: string;
  bodyClass?: string;
  noborder?: boolean;
  titleClass?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerslot,
  className = "",
  bodyClass = "p-6",
  noborder,
  titleClass = "text-xl font-semibold text-slate-900 dark:text-slate-200",
}) => {
  return (
    <div className={`card bg-white dark:bg-slate-800 shadow rounded-lg ${className}`}>
      {(title || subtitle) && (
        <header className={`card-header p-6 ${noborder ? "border-none" : "border-b border-slate-200 dark:border-slate-700"}`}>
          <div className="flex justify-between items-center">
            <div>
              {title && <div className={`card-title ${titleClass}`}>{title}</div>}
              {subtitle && <div className="card-subtitle text-sm text-slate-600 dark:text-slate-400">{subtitle}</div>}
            </div>
            {headerslot && <div className="card-header-slot">{headerslot}</div>}
          </div>
        </header>
      )}
      <main className={`card-body ${bodyClass}`}>{children}</main>
    </div>
  );
};

export default Card;
