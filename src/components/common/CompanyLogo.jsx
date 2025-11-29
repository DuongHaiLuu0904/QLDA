import { useState } from 'react';
import { generateAvatar } from '../../utils/avatarGenerator';

const CompanyLogo = ({ 
    src, 
    alt, 
    companyName,
    className = '', 
    size = 'md',
    rounded = 'lg'
}) => {
    const [imageError, setImageError] = useState(false);
    const [loading, setLoading] = useState(true);

    // Size classes
    const sizeClasses = {
        xs: 'w-8 h-8',
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20',
        xl: 'w-24 h-24',
        '2xl': 'w-32 h-32'
    };

    // Rounded classes
    const roundedClasses = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full'
    };

    const sizeClass = sizeClasses[size] || sizeClasses.md;
    const roundedClass = roundedClasses[rounded] || roundedClasses.lg;

    // Generate fallback avatar
    const fallbackSrc = generateAvatar(companyName || alt, { 
        size: 200, 
        type: 'company' 
    });

    const handleImageError = () => {
        setImageError(true);
        setLoading(false);
    };

    const handleImageLoad = () => {
        setLoading(false);
    };

    // If original image fails or doesn't exist, use generated avatar
    const imageSrc = (!src || imageError) ? fallbackSrc : src;

    return (
        <div className={`${sizeClass} ${roundedClass} overflow-hidden bg-gray-100 flex items-center justify-center relative ${className}`}>
            {loading && !imageError && src && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            )}
            <img
                src={imageSrc}
                alt={alt || companyName || 'Company logo'}
                className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"
            />
        </div>
    );
};

export default CompanyLogo;
