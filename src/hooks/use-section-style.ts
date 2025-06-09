import { useTheme } from '@/contexts/ThemeContext';
import { themeConfig } from '@/config/theme';

interface SectionStyleProps {
  type: 'hero' | 'a' | 'b';
  isOverlapping?: boolean;
}

export function useSectionStyle({ type, isOverlapping = false }: SectionStyleProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getBackground = () => {
    if (type === 'hero') {
      return isDark ? themeConfig.hero.dark : themeConfig.hero.light;
    }
    return isDark 
      ? themeConfig.sections[type].dark 
      : themeConfig.sections[type].light;
  };

  const containerClasses = [
    'relative',
    'w-full',
    isOverlapping ? '-mt-20' : '',
    type === 'hero' ? '' : 'py-20'
  ].filter(Boolean).join(' ');

  const backgroundStyle = {
    backgroundColor: getBackground(),
    borderTopLeftRadius: type !== 'hero' && isOverlapping ? '20px' : '0',
    borderTopRightRadius: type !== 'hero' && isOverlapping ? '20px' : '0'
  };

  return {
    containerClasses,
    backgroundStyle
  };
}
