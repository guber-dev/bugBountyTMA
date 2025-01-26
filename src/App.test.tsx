import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('@vkruglikov/react-telegram-web-app', () => ({
  useWebApp: () => ({
    expand: jest.fn(),
    ready: jest.fn(),
    initDataUnsafe: {
      user: {
        username: 'testuser'
      }
    }
  })
}));

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
  });
}); 