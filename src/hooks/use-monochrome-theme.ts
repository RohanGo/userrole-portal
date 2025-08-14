
import { useTheme } from '@/contexts/theme-context';
import { monochromeTheme, getThemeVariable } from '@/lib/theme';

export function useMonochromeTheme() {
  const { actualTheme } = useTheme();
  
  const getColor = (colorKey: keyof typeof monochromeTheme.light) => {
    return getThemeVariable(colorKey);
  };
  
  const getCurrentThemeColors = () => {
    return monochromeTheme[actualTheme];
  };
  
  return {
    theme: actualTheme,
    colors: getCurrentThemeColors(),
    getColor,
    isLight: actualTheme === 'light',
    isDark: actualTheme === 'dark'
  };
}
