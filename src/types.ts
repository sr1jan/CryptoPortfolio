export interface app_state {
  portReducer: port_state;
  returnsReducer: returns_state;
}

export interface port_state {
  counter: number;
  token: token_prop[];
  priceData: object;
  currency: string;
  theme: string;
  inr: {
    totalInvestment: number;
    totalPortAmount: number;
    totalPortPercent: number;
  };
}

export interface returns_state {
  inr: {
    returns: number[];
    time: string[];
  };
}

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

export interface setThemeType {
  type: string;
  theme: string;
}

export interface setCurrencyType {
  type: string;
  currency: string;
}

export interface clearPortType {
  type: string;
}

export type portActionTypes =
  | addCoinType
  | clearPortType
  | updatePriceType
  | addPriceDataType
  | loadDataType
  | deleteCoinType
  | setThemeType
  | setCurrencyType;

export interface addReturnsType {
  type: string;
  value: number;
  time: string;
}

export interface deleteReturnsType {
  type: string;
}

export type returnsActionTypes = addReturnsType | deleteReturnsType;

export interface alertModalType {
  title: string;
  description: string;
  act?: () => void;
  actText?: string;
  suppress: () => void;
  suppressText: string;
  visible: boolean;
}
