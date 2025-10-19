/**
 * Gets the current theme from localStorage.
 * Defaults to 'dark' if no theme is found.
 * @returns {'light' | 'dark'} The stored theme.
 */
export const getTheme = (): 'light' | 'dark' => {
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }
    } catch (e) {
        console.error("Failed to read theme from localStorage", e);
    }
    return 'dark'; // Default theme
};

/**
 * Saves the selected theme to localStorage.
 * @param {'light' | 'dark'} theme - The theme to save.
 */
export const setTheme = (theme: 'light' | 'dark'): void => {
    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        console.error("Failed to save theme to localStorage", e);
    }
};
