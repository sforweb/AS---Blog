interface ThemeConfig {
  hero: {
    light: string;
    dark: string;
  };
  sections: {
    a: {
      light: string;
      dark: string;
      cards: {
        light: string;
        dark: string;
      };
    };
    b: {
      light: string;
      dark: string;
      cards: {
        light: string;
        dark: string;
      };
    };
  };
  overlays: {
    light: {
      opacity: number;
      color: string;
    };
    dark: {
      opacity: number;
      color: string;
    };
  };
  header: {
    light: {
      default: string;
      scrolled: string;
    };
    dark: {
      default: string;
      scrolled: string;
    };
  };
}

export const themeConfig: ThemeConfig = {
  hero: {
    light: '#ffffff',
    dark: '#020525'
  },
  sections: {
    a: {
      light: '#f8fafc',
      dark: '#030929',
      cards: {
        light: '#ffffff',
        dark: '#00031e'
      }
    },
    b: {
      light: '#ffffff',
      dark: '#01051b',
      cards: {
        light: '#f8fafc',
        dark: '#67c9f8'
      }
    }
  }, // Área do vídeo
  overlays: {
    light: {
      opacity: 0.95,
      color: '#ffffff'
    },
    dark: {
      opacity: 0.6,
      color: '#000000'
    }
  }, // Menu
  header: {
    light: {
      default: 'rgba(255, 255, 255, 0.2)',
      scrolled: 'rgba(255, 255, 255, 0.8)'
    },
    dark: {
      default: 'rgba(0, 0, 43, 0.2)',
      scrolled: 'rgba(0, 0, 43, 0.8)'
    }
  }
};
