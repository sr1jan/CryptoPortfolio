import {createContext} from 'react';

interface contextType {
  changeQuery: (string) => void;
  query: string;
}

export const SearchCoinContext = createContext<contextType>({
  changeQuery: () => {},
  query: '',
});
