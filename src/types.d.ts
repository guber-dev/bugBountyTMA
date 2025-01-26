interface Window {
  Telegram?: {
    WebApp: {
      openTelegramLink: (url: string) => void;
      initData: string;
      initDataUnsafe: {
        user?: {
          id: number;
          first_name: string;
          last_name?: string;
          username?: string;
          language_code?: string;
          photo_url?: string;
        };
      };
      ready: () => void;
      expand: () => void;
      close: () => void;
      HapticFeedback?: {
        impactOccurred: (style: 'light' | 'medium' | 'heavy') => void;
        notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
      };
    };
  };
} 