import {createContext} from 'react';

interface contextType {
  toggleTheme: () => void;
  theme: string;
}

export const ThemeContext = createContext<contextType>({
  toggleTheme: () => {},
  theme: 'dark',
});
