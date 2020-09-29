export interface token_prop {
  id: number;
  coin: string;
  market: string;
  amount: number;
  price: number;
  boughtVal: number;
  returns: number;
  percent: number;
  inr: {
    cap: number;
    returns: number;
  };
}

export interface theme_prop {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
}

export interface totalPort {
  totalInvestment: number;
  totalPortAmount: number;
  totalPortPercent: number;
}

export interface port_state {
  counter: number;
  token: token_prop[];
  priceData: object;
  currency: string;
  inr: {
    totalInvestment: number;
    totalPortAmount: number;
    totalPortPercent: number;
  };
}

export interface app_state {
  portReducer: port_state;
}

export interface addPriceDataType {
  type: string;
  data: object;
}

export interface addCoinType {
  type: string;
  coinDetail: token_prop;
  counter: number;
}

export interface loadDataType {
  type: string;
  coinDetailList: token_prop[];
  storedCounter: number;
  portData: totalPort;
  marketData: object;
}

export interface updatePriceType {
  type: string;
  newCoinDetail: token_prop;
  idx: number;
}

export interface deleteCoinType {
  type: string;
  index: number;
}

export interface clearPortType {
  type: string;
}

export type actionTypes =
  | addCoinType
  | clearPortType
  | updatePriceType
  | addPriceDataType
  | loadDataType
  | deleteCoinType;
