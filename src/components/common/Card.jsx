import React from 'react';

const Card = ({
    children,
    className = '',
    padding = 'md',
    hover = false,
    onClick,
    title,
    subtitle,
    actions,
    ...props
}) => {
    const paddings = {
        none: '',
        sm: 'p-3',
        md: 'p-4 md:p-6',
        lg: 'p-6 md:p-8'
    };

    return (
        <div
            className={`
        bg-white rounded-lg border border-gray-200 shadow-sm
        ${paddings[padding]}
        ${hover ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}
        ${className}
      `}
            onClick={onClick}
            {...props}
        >
            {(title || actions) && (
                <div className="flex items-start justify-between mb-4">
                    <div>
                        {title && (
                            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        )}
                        {subtitle && (
                            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
                        )}
                    </div>
                    {actions && (
                        <div className="flex items-center gap-2">
                            {actions}
                        </div>
                    )}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
