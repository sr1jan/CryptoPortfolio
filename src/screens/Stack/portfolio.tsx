import React from 'react';
import {View, Alert, ActivityIndicator} from 'react-native';
import {Overlay} from 'react-native-elements';
import {styles} from '../../styles/styles';
import {
  token_prop,
  theme_prop,
  app_state,
  addCoinType,
  updatePriceType,
  addPriceDataType,
  totalPort,
  loadDataType,
} from '../../types';

import {connect} from 'react-redux';
import {
  addCoin,
  updatePrices,
  addPriceData,
  loadDataFromStorage,
} from '../../actions/port';

import CoinInput from '../../components/coinInput';
import DisplayPL from '../../components/displayPL';
import NewCoin from '../../components/newCoin';
import {
  getCoinDetail,
  getCounter,
  storeCoinDetail,
  storeCounter,
  getTotalPort,
  storeTotalPort,
  storeMarketData,
  getMarketData,
} from '../../helpers/asyncStorage';

import {coins} from '../../data/coins';
const URL = 'https://api.wazirx.com/api/v2/tickers';

interface Props {
  theme: theme_prop;
  token: token_prop[];
  counter: number;
  inr: totalPort;
  priceData: object;
  addCoin: (coinDetail: token_prop, counter: number) => addCoinType;
  updatePrices: (coinDetail: token_prop, idx: number) => updatePriceType;
  priceDataUpdate: (data: object) => addPriceDataType;
  loadDataFromStorage: (
    coinDetailList: token_prop[],
    counter: number,
    portData: totalPort,
    marketData: object,
  ) => loadDataType;
}

interface localState {
  visible: boolean;
  loading: boolean;
}

class Portfolio extends React.Component<Props, localState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      loading: true,
    };
  }

  _interval: any;

  async componentDidMount(): Promise<void> {
    try {
      const counter: number | null | undefined = await getCounter();
      if (
        counter !== null &&
        counter !== undefined &&
        this.props.counter !== counter
      ) {
        const coinDetailList: token_prop[] | null = await getCoinDetail();
        const portData: totalPort | null = await getTotalPort();
        const marketData: object | null = await getMarketData();
        if (
          coinDetailList !== null &&
          portData !== null &&
          marketData !== null
        ) {
          this.props.loadDataFromStorage(
            coinDetailList,
            counter,
            portData,
            marketData,
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
    this.setState({loading: !this.state.loading});
    this.priceUpdate();
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  toggleOverlay = () => {
    this.setState({visible: !this.state.visible});
  };

  async fetchData() {
    const response = await fetch(URL);
    const json = await response.json();
    return json;
  }

  submit = async (token_object: token_prop) => {
    if (
      token_object.amount === 0 ||
      token_object.price === 0 ||
      token_object.coin === '' ||
      token_object.market === ''
    ) {
      Alert.alert('Error', 'Please fill in all the required details');
    } else if (coins.indexOf(token_object.coin + token_object.market) === -1) {
      Alert.alert(
        'Error',
        'Could not find the specified coin/market. Please try something else.',
      );
    } else {
      token_object.id = this.props.counter + 1;
      token_object.boughtVal = token_object.amount * token_object.price;
      this.toggleOverlay();
      this.setState({loading: !this.state.loading});
      this.newCoin(token_object);
    }
  };

  newCoin = async (token_object: token_prop) => {
    let json: object;
    try {
      json = await this.fetchData();
      this.props.priceDataUpdate(json);
    } catch (e) {
      this.setState({loading: !this.state.loading});
      Alert.alert(
        'SERVER ERROR',
        'Failed to fetch data from the market, try again after sometime',
      );
      console.log('Could not fetch coin detail from the api', e);
      return;
    }
    const name = token_object.coin + token_object.market;
    const boughtVal = token_object.boughtVal;
    const curPrice = json[name].last;
    const curVal = curPrice * token_object.amount;
    const returns = curVal - boughtVal;
    const percent = (returns / boughtVal) * 100;
    token_object = {
      ...token_object,
      returns: returns,
      percent: percent,
    };
    this.props.addCoin(token_object, token_object.id);
    this.setState({loading: !this.state.loading});
    try {
      await storeCounter(this.props.counter);
      await storeCoinDetail(this.props.token);
      await storeTotalPort(this.props.inr);
      await storeMarketData(this.props.priceData);
    } catch (e) {
      console.log('Could not store newCoin in local storage', e);
    }
  };

  priceUpdate = () => {
    this._interval = setInterval(async () => {
      if (this.props.token.length === 0) return;
      let json: object;
      try {
        json = await this.fetchData();
      } catch (e) {
        console.log(e);
        return;
      }
      this.props.token.map(token_object => {
        const idx = token_object.id - 1;
        const name = token_object.coin + token_object.market;
        const curPrice = json[name].last;
        const curVal = curPrice * token_object.amount;
        const returns = curVal - token_object.boughtVal;
        if (returns.toFixed(2) === token_object.returns.toFixed(2)) return;
        const percent = (returns / token_object.boughtVal) * 100;
        token_object = {
          ...token_object,
          returns: returns,
          percent: percent,
        };
        this.props.updatePrices(token_object, idx);
        this.setState(this.state);
        this.props.priceDataUpdate(json);
      });
      try {
        await storeCoinDetail(this.props.token);
        await storeTotalPort(this.props.inr);
        await storeMarketData(this.props.priceData);
      } catch (e) {
        console.log(e);
      }
    }, 10000);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          {!this.state.loading && !this.props.counter && (
            <NewCoin
              theme={this.props.theme}
              toggleOverlay={this.toggleOverlay}
            />
          )}
          {this.props.counter > 0 && (
            <DisplayPL
              theme={this.props.theme}
              toggleOverlay={this.toggleOverlay}
            />
          )}
          {this.state.loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </View>
        <Overlay
          isVisible={this.state.visible}
          onBackdropPress={this.toggleOverlay}>
          {<CoinInput submit={this.submit} token={this.props.token} />}
        </Overlay>
      </View>
    );
  }
}

const mapStateToProps = (state: app_state) => {
  return {
    token: state.portReducer.token,
    counter: state.portReducer.counter,
    inr: state.portReducer.inr,
    priceData: state.portReducer.priceData,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCoin: (coinDetail: token_prop, counter: number) =>
      dispatch(addCoin(coinDetail, counter)),
    updatePrices: (coinDetail: token_prop, idx: number) =>
      dispatch(updatePrices(coinDetail, idx)),
    priceDataUpdate: (data: object) => dispatch(addPriceData(data)),
    loadDataFromStorage: (
      coinDetailList: token_prop[],
      counter: number,
      portData: totalPort,
      marketData: object,
    ) =>
      dispatch(
        loadDataFromStorage(coinDetailList, counter, portData, marketData),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Portfolio);
