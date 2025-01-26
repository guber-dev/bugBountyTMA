interface Window {
  Telegram?: {
    WebApp: {
      openTelegramLink: (url: string) => void;
      initData: string;
      initDataUnsafe: {
        user?: {
          username: string;
          first_name: string;
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