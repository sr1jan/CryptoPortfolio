import {ADD_RETURNS, DELETE_RETURNS} from './types';

export const addReturns = (value: number, time: string) => ({
  type: ADD_RETURNS,
  value: value,
  time: time,
});

export const deleteReturns = () => ({
  type: DELETE_RETURNS,
});
