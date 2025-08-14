
// Centralized monochrome theme configuration
export const monochromeTheme = {
  // Base monochrome palette
  colors: {
    white: '0 0% 100%',
    black: '0 0% 0%',
    gray: {
      50: '0 0% 98%',
      100: '0 0% 96%',
      200: '0 0% 93%',
      300: '0 0% 87%',
      400: '0 0% 64%',
      500: '0 0% 45%',
      600: '0 0% 32%',
      700: '0 0% 25%',
      800: '0 0% 15%',
      900: '0 0% 9%',
      950: '0 0% 4%'
    }
  },
  
  // Light theme variables
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 9%',
    card: '0 0% 100%',
    'card-foreground': '0 0% 9%',
    popover: '0 0% 100%',
    'popover-foreground': '0 0% 9%',
    primary: '0 0% 15%',
    'primary-foreground': '0 0% 98%',
    secondary: '0 0% 96%',
    'secondary-foreground': '0 0% 25%',
    muted: '0 0% 96%',
    'muted-foreground': '0 0% 45%',
    accent: '0 0% 96%',
    'accent-foreground': '0 0% 25%',
    destructive: '0 0% 25%',
    'destructive-foreground': '0 0% 98%',
    success: '0 0% 25%',
    'success-foreground': '0 0% 98%',
    warning: '0 0% 25%',
    'warning-foreground': '0 0% 98%',
    border: '0 0% 93%',
    input: '0 0% 93%',
    ring: '0 0% 15%',
    // Gray scale
    'gray-50': '0 0% 98%',
    'gray-100': '0 0% 96%',
    'gray-200': '0 0% 93%',
    'gray-300': '0 0% 87%',
    'gray-400': '0 0% 64%',
    'gray-500': '0 0% 45%',
    'gray-600': '0 0% 32%',
    'gray-700': '0 0% 25%',
    'gray-800': '0 0% 15%',
    'gray-900': '0 0% 9%',
    'gray-950': '0 0% 4%',
    // Admin colors
    'admin-sidebar': '0 0% 9%',
    'admin-sidebar-foreground': '0 0% 87%',
    'admin-header': '0 0% 100%',
    'admin-surface': '0 0% 98%',
    // Status colors (monochrome with slight variations)
    'status-active': '0 0% 25%',
    'status-inactive': '0 0% 64%',
    'status-pending': '0 0% 45%',
    'status-suspended': '0 0% 15%'
  },
  
  // Dark theme variables
  dark: {
    background: '0 0% 9%',
    foreground: '0 0% 93%',
    card: '0 0% 15%',
    'card-foreground': '0 0% 93%',
    popover: '0 0% 15%',
    'popover-foreground': '0 0% 93%',
    primary: '0 0% 93%',
    'primary-foreground': '0 0% 9%',
    secondary: '0 0% 25%',
    'secondary-foreground': '0 0% 93%',
    muted: '0 0% 25%',
    'muted-foreground': '0 0% 64%',
    accent: '0 0% 25%',
    'accent-foreground': '0 0% 93%',
    destructive: '0 0% 87%',
    'destructive-foreground': '0 0% 9%',
    success: '0 0% 87%',
    'success-foreground': '0 0% 9%',
    warning: '0 0% 87%',
    'warning-foreground': '0 0% 9%',
    border: '0 0% 25%',
    input: '0 0% 25%',
    ring: '0 0% 93%',
    // Gray scale for dark mode
    'gray-50': '0 0% 4%',
    'gray-100': '0 0% 9%',
    'gray-200': '0 0% 15%',
    'gray-300': '0 0% 25%',
    'gray-400': '0 0% 32%',
    'gray-500': '0 0% 45%',
    'gray-600': '0 0% 64%',
    'gray-700': '0 0% 87%',
    'gray-800': '0 0% 93%',
    'gray-900': '0 0% 96%',
    'gray-950': '0 0% 98%',
    // Admin colors for dark mode
    'admin-sidebar': '0 0% 4%',
    'admin-sidebar-foreground': '0 0% 64%',
    'admin-header': '0 0% 15%',
    'admin-surface': '0 0% 9%',
    // Status colors for dark mode
    'status-active': '0 0% 87%',
    'status-inactive': '0 0% 45%',
    'status-pending': '0 0% 64%',
    'status-suspended': '0 0% 93%'
  }
};

// Theme utility functions
export const getThemeVariable = (variable: string): string => {
  return `hsl(var(--${variable}))`;
};

export const generateCSSVariables = (theme: 'light' | 'dark') => {
  const variables = monochromeTheme[theme];
  return Object.entries(variables)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n    ');
};
