// Generate random avatar for companies and users
export const generateAvatar = (name, options = {}) => {
    const {
        size = 150,
        type = 'company' // 'company' or 'user'
    } = options;

    if (!name) return null;

    // List of vibrant colors for avatars
    const colors = [
        '4A90E2', // Blue
        'E24A4A', // Red
        '4AE290', // Green
        'E2904A', // Orange
        '904AE2', // Purple
        'E24A90', // Pink
        '4AE2E2', // Cyan
        'E2E24A', // Yellow
        '4A4AE2', // Indigo
        'E24AE2', // Magenta
        '2ECC71', // Emerald
        'F39C12', // Carrot
        '9B59B6', // Amethyst
        '34495E', // Wet Asphalt
        '16A085', // Green Sea
        'E67E22', // Pumpkin
        '3498DB', // Peter River
        'E74C3C', // Alizarin
        '1ABC9C', // Turquoise
        'D35400', // Pumpkin Dark
    ];

    // Generate a consistent color based on name
    const hashCode = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash);
    };

    const colorIndex = hashCode(name) % colors.length;
    const bgColor = colors[colorIndex];

    // Get initials from name
    const getInitials = (fullName) => {
        const words = fullName.trim().split(/\s+/);
        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        }
        return words
            .slice(0, 2)
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase();
    };

    const initials = getInitials(name);

    // Using ui-avatars.com API with custom styling
    const params = new URLSearchParams({
        name: initials,
        background: bgColor,
        color: 'ffffff',
        size: size.toString(),
        bold: 'true',
        format: 'svg',
        rounded: type === 'company' ? 'false' : 'true',
        uppercase: 'true',
        length: '2'
    });

    return `https://ui-avatars.com/api/?${params.toString()}`;
};

// Fallback avatar if image fails to load
export const getDefaultAvatar = (name, type = 'company') => {
    return generateAvatar(name, { size: 200, type });
};

// Alternative: Use DiceBear API for more variety
export const generateDiceBearAvatar = (seed, style = 'initials') => {
    // Available styles: adventurer, avataaars, big-ears, big-smile, bottts, croodles, 
    // fun-emoji, icons, identicon, initials, lorelei, micah, miniavs, open-peeps, personas, pixel-art
    const styles = {
        company: 'initials',
        modern: 'shapes',
        fun: 'bottts',
        professional: 'identicon'
    };

    const selectedStyle = styles[style] || style;
    return `https://api.dicebear.com/7.x/${selectedStyle}/svg?seed=${encodeURIComponent(seed)}`;
};

// Random gradient background
export const generateGradientAvatar = (name) => {
    const gradients = [
        'from-blue-400 to-blue-600',
        'from-purple-400 to-purple-600',
        'from-pink-400 to-pink-600',
        'from-green-400 to-green-600',
        'from-yellow-400 to-yellow-600',
        'from-red-400 to-red-600',
        'from-indigo-400 to-indigo-600',
        'from-teal-400 to-teal-600',
    ];

    const hashCode = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash);
    };

    const index = hashCode(name) % gradients.length;
    return gradients[index];
};

export default generateAvatar;
