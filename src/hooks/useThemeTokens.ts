import { useEffect } from 'react';
import theme from '../styles/pandora-theme.json';

const flattenTheme = (source: Record<string, unknown>, prefix = ''): Record<string, string> => {
  const flattened: Record<string, string> = {};

  Object.entries(source).forEach(([key, value]) => {
    const nextKey = prefix ? `${prefix}-${key}` : key;

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(flattened, flattenTheme(value as Record<string, unknown>, nextKey));
      return;
    }

    flattened[nextKey] = String(value);
  });

  return flattened;
};

export const useThemeTokens = () => {
  useEffect(() => {
    const root = document.documentElement;
    const tokenMap = flattenTheme(theme as Record<string, unknown>);

    Object.entries(tokenMap).forEach(([token, value]) => {
      root.style.setProperty(`--${token}`, value);
    });
  }, []);
};
