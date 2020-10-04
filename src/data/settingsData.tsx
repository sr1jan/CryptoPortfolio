import React from 'react';
import {DeletePorfolioButton, ThemeSwitchButton} from '../components/buttons';

const portData = [
  {
    title: 'Delete Portfolio',
    description: 'This will delete all of your data.',
    button: <DeletePorfolioButton />,
  },
];

const appearanceData = [
  {
    title: 'Change Theme',
    description: 'Switch between dark and light theme.',
    button: <ThemeSwitchButton />,
  },
];

export const settingSections = [
  {
    heading: 'Portfolio',
    data: portData,
  },
  {
    heading: 'Appearance',
    data: appearanceData,
  },
];
