import React from 'react';
import {
  DeletePorfolioButton,
  ThemeSwitchButton,
  SearchCoinButton,
  AddCoinButton,
  ChangeCurrencyButton,
  ExportData,
  TwitterButton,
  MailButton,
} from '../components/buttons';

const portData = [
  {
    title: 'Add Coin',
    description: 'Add a coin to your portfolio.',
    button: <AddCoinButton />,
  },
  {
    title: 'Search Coins',
    description: 'Filter coins using their abbreviation.',
    button: <SearchCoinButton />,
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

const accountData = [
  {
    title: 'Export Data',
    description: 'Export portfolio data as a JSON file.',
    button: <ExportData />,
  },
  {
    title: 'Delete Portfolio',
    description: 'This will delete all of your data.',
    button: <DeletePorfolioButton />,
  },
];

const contactData = [
  {
    title: 'DM',
    description: 'Mention the app when shooting a ping.',
    button: <TwitterButton />,
  },
  {
    title: 'Mail',
    description: 'For those who prefer email.',
    button: <MailButton />,
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
  {
    heading: 'Account',
    data: accountData,
  },
  {
    heading: 'Get in touch',
    data: contactData,
  },
];
