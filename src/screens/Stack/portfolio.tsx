import React from 'react';
import {View, Text, Alert, TextInput, ScrollView} from 'react-native';
import {Button, Overlay, Icon, ListItem} from 'react-native-elements';
import {styles} from '../../styles/styles';
import {
  token_prop,
  theme_prop,
  app_state,
  addCoinType,
  updatePriceType,
} from '../../types';

import {connect} from 'react-redux';
import {addCoin, updatePrices} from '../../actions/port';

import DisplayPL from '../../components/displayPL';
import NewCoin from '../../components/newCoin';
import {
  getCoinDetail,
  getCounter,
  storeCoinDetail,
  storeCounter,
} from '../../helpers/asyncStorage';

import {coins} from '../../data/coins';
const URL = 'https://api.wazirx.com/api/v2/tickers';

interface Props {
  theme: theme_prop;
  token: token_prop[];
  counter: number;
  addCoin: (coinDetail: token_prop[], counter: number) => addCoinType;
  updatePrices: (coinDetail: token_prop, idx: number) => updatePriceType;
}

interface localState {
  visible: boolean;
}

class Portfolio extends React.Component<Props, localState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  token_object: token_prop = {
    id: 0,
    coin: '',
    market: '',
    amount: 0,
    price: 0,
    boughtVal: 0,
    profit: 0,
    loss: 0,
    percent: 0,
  };

  _interval: any;

  static getDerivedStateFromProps(nextProps: Props) {
    console.log('next props', nextProps.token, nextProps.counter);
    return null;
  }

  async componentDidMount(): Promise<void> {
    try {
      const counter: number | null | undefined = await getCounter();
      const coinDetail: token_prop[] | null = await getCoinDetail();
      if (counter !== null && counter !== undefined && coinDetail !== null) {
        if (this.props.counter !== counter) {
          this.props.addCoin(coinDetail, counter);
        }
      }
    } catch (e) {
      console.log(e);
    }
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
      !token_object.amount ||
      !token_object.price ||
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
      this.props.addCoin([token_object], token_object.id);
      this.toggleOverlay();
      await this.newCoin(token_object);
    }
  };

  newCoin = async (token_object: token_prop) => {
    let json: object;
    try {
      json = await this.fetchData();
    } catch (e) {
      console.log('Could not fetch coin detail from the api', e);
      return;
    }
    const name = token_object.coin + token_object.market;
    const idx = token_object.id - 1;
    const boughtVal = token_object.boughtVal;
    try {
      const curPrice = json[name].last;
      const curVal = curPrice * token_object.amount;
      if (curVal > boughtVal) {
        const profit = curVal - boughtVal;
        const percent = (profit / boughtVal) * 100;
        token_object = {
          ...token_object,
          profit: parseFloat(profit.toFixed(2)),
          percent: parseFloat(percent.toFixed(2)),
          loss: 0,
        };
        this.props.updatePrices(token_object, idx);
      } else {
        const loss = boughtVal - curVal;
        const percent = (loss / boughtVal) * 100;
        token_object = {
          ...token_object,
          loss: parseFloat(loss.toFixed(2)),
          percent: parseFloat(percent.toFixed(2)),
          profit: 0,
        };
        this.props.updatePrices(token_object, idx);
      }
      this.setState(this.state);
      try {
        await storeCounter(this.props.counter);
        await storeCoinDetail(this.props.token);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log('newCoin catch error', e);
    }
  };

  priceUpdate = () => {
    this._interval = setInterval(async () => {
      if (this.props.token.length === 0) return;
      const json = await this.fetchData();
      this.props.token.map(token_object => {
        const idx = token_object.id - 1;
        const name = token_object.coin + token_object.market;
        const curPrice = json[name].last;
        const curVal = curPrice * token_object.amount;
        if (curVal > token_object.boughtVal) {
          const profit = curVal - token_object.boughtVal;
          const percent = (profit / token_object.boughtVal) * 100;
          if (parseFloat(profit.toFixed(2)) === token_object.profit) return;
          token_object = {
            ...token_object,
            profit: parseFloat(profit.toFixed(2)),
            percent: parseFloat(percent.toFixed(2)),
            loss: 0,
          };
          this.props.updatePrices(token_object, idx);
          this.setState(this.state);
        } else if (curVal < token_object.boughtVal) {
          const loss = token_object.boughtVal - curVal;
          const percent = (loss / token_object.boughtVal) * 100;
          if (parseFloat(loss.toFixed(2)) === token_object.loss) return;
          token_object = {
            ...token_object,
            loss: parseFloat(loss.toFixed(2)),
            percent: parseFloat(percent.toFixed(2)),
            profit: 0,
          };
          this.props.updatePrices(token_object, idx);
          this.setState(this.state);
        } else {
          return;
        }
      });
      try {
        await storeCounter(this.props.counter);
        await storeCoinDetail(this.props.token);
      } catch (e) {
        console.log(e);
      }
    }, 10000);
  };

  coinInput = () => {
    let token_object = this.token_object;
    return (
      <View style={{marginRight: 50, marginLeft: 50}}>
        <TextInput
          placeholder="Coin: BTC"
          onChangeText={value => (token_object.coin = value.toLowerCase())}
          style={{textAlign: 'center', fontSize: 20}}
        />
        <TextInput
          placeholder="Market: USDT"
          onChangeText={value => (token_object.market = value.toLowerCase())}
          style={{textAlign: 'center', fontSize: 20}}
        />
        <TextInput
          placeholder="Amount: 0.0131"
          onChangeText={value => (token_object.amount = parseFloat(value))}
          style={{textAlign: 'center', fontSize: 20}}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Price: 7500"
          onChangeText={value => (token_object.price = parseFloat(value))}
          style={{textAlign: 'center', fontSize: 20}}
          keyboardType="numeric"
        />
        <Button
          title="Submit"
          type="outline"
          containerStyle={{marginTop: 15, marginBottom: 15}}
          titleStyle={{fontSize: 15}}
          onPress={() => this.submit(token_object)}
          raised
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {<DisplayPL theme={this.props.theme} token={this.props.token} />}
          {
            <NewCoin
              theme={this.props.theme}
              toggleOverlay={this.toggleOverlay}
            />
          }
        </ScrollView>
        <Overlay
          isVisible={this.state.visible}
          onBackdropPress={this.toggleOverlay}>
          {this.coinInput()}
        </Overlay>
      </View>
    );
  }
}

const mapStateToProps = (state: app_state) => {
  return {
    token: state.portReducer.token,
    counter: state.portReducer.counter,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCoin: (coinDetail: token_prop[], counter: number) =>
      dispatch(addCoin(coinDetail, counter)),
    updatePrices: (coinDetail: token_prop, idx: number) =>
      dispatch(updatePrices(coinDetail, idx)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Portfolio);
