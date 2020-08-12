export interface token_prop {
  id: number;
  coin: string;
  market: string;
  amount: number;
  price: number;
  boughtVal: number;
  profit: number;
  loss: number;
  percent: number;
}

export interface theme_prop {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
}

export interface port_state {
  token: token_prop[];
  counter: number;
}

export interface app_state {
  portReducer: port_state;
}

export interface addCoinType {
  type: string;
  coinDetailList: token_prop[];
  counter: number;
}

export interface updatePriceType {
  type: string;
  coinDetail: token_prop;
  idx: number;
}

export interface clearPortType {
  type: string;
}

export type actionTypes = addCoinType | clearPortType | updatePriceType;
