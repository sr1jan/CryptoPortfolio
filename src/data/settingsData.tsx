import React from 'react';
import {
  DeletePorfolioButton,
  ThemeSwitchButton,
  SearchCoinButton,
  AddCoinButton,
  ChangeCurrencyButton,
} from '../components/buttons';

const portData = [
  {
    title: 'Delete Portfolio',
    description: 'This will delete all of your data.',
    button: <DeletePorfolioButton />,
  },
  {
    title: 'Search Coins',
    description: 'Filter coins using their abbreviation.',
    button: <SearchCoinButton />,
  },
  {
    title: 'Add Coin',
    description: 'Add a coin to your portfolio.',
    button: <AddCoinButton />,
  },
];

const preferencesData = [
  {
    title: 'Change Theme',
    description: 'Switch between dark and light theme.',
    button: <ThemeSwitchButton />,
  },
  {
    title: 'Set Currency',
    description: 'Choose from the available currencies.',
    button: <ChangeCurrencyButton />,
  },
];

export const settingSections = [
  {
    heading: 'Portfolio',
    data: portData,
  },
  {
    heading: 'Preferences',
    data: preferencesData,
  },
];
