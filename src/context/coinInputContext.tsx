import {createContext} from 'react';

interface contextType {
  toggleModal: () => void;
  coinInputModal: boolean;
}

export const CoinInputContext = createContext<contextType>({
  toggleModal: () => {},
  coinInputModal: false,
});
