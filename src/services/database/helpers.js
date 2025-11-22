// Helper Functions for Mock Data Generation

// Simulate API delay
export const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchMockData = (data, delayMs = 800) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(data), delayMs);
    });
};

// Generate date within last N days
export const getRandomDate = (daysAgo) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
    return date.toISOString().split('T')[0];
};

// Generate date within specific range
export const getDateInRange = (startDaysAgo, endDaysAgo) => {
    const date = new Date();
    const randomDays = Math.floor(Math.random() * (startDaysAgo - endDaysAgo + 1)) + endDaysAgo;
    date.setDate(date.getDate() - randomDays);
    return date.toISOString().split('T')[0];
};

// Generate random number in range
export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random item from array
export const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

// Generate random items from array
export const getRandomItems = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
