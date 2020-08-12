import React from 'react';
import {View, Text, Alert, TextInput, ScrollView} from 'react-native';
import {Button, Overlay, Icon, ListItem} from 'react-native-elements';
import {DefaultTheme} from '@react-navigation/native';
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
    console.log(this.props);
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

  async componentDidMount(): Promise<void> {
    const counter: number | null | undefined = await getCounter();
    const coinDetail: token_prop[] | null = await getCoinDetail();
    if (counter !== null && counter !== undefined && coinDetail !== null) {
      console.log('addCoin from componenetDidMount');
      this.props.addCoin(coinDetail, counter);
      // this.setState({counter: counter, token: coinDetail});
    }

    /* this.priceUpdate(); */
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  toggleOverlay = () => {
    this.setState({visible: !this.state.visible});
  };

  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

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
      console.log('coin after submit', this.props.token, this.props.counter);
      this.newCoin(token_object);
      this.toggleOverlay();
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
    // const token: token_prop[] = [...this.props.token];
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
      console.log(
        'newCoin after profit/loss update',
        this.props.token,
        this.props.counter,
      );
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
        // const token = [...this.state.token];
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
        } else {
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

  displayPL = () => {
    if (this.props.token.length === 0) return;
    return (
      <View>
        {this.props.token.map((token, i) => (
          <ListItem
            key={i}
            containerStyle={{backgroundColor: this.props.theme.background}}
            title={token.coin.toUpperCase()}
            titleStyle={{fontWeight: 'bold', color: this.props.theme.text}}
            subtitle={token.market.toUpperCase()}
            subtitleStyle={{color: this.props.theme.text}}
            rightElement={
              token.profit > 0 ? (
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: this.props.theme.text,
                      fontWeight: 'bold',
                    }}>
                    +{this.numberWithCommas(token.profit)}{' '}
                  </Text>
                  <View
                    style={{
                      borderRadius: 3,
                      borderWidth: 1,
                      borderColor: styles.profit.color,
                    }}>
                    <Text
                      style={{
                        backgroundColor: styles.profit.color,
                        color: this.props.theme.text,
                        fontWeight: 'bold',
                        padding: 6,
                        fontSize: 14,
                      }}>
                      {token.percent.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: this.props.theme.text,
                      fontWeight: 'bold',
                    }}>
                    {' '}
                    -{this.numberWithCommas(token.loss)}{' '}
                  </Text>
                  <View
                    style={{
                      borderRadius: 3,
                      borderWidth: 1,
                      borderColor: styles.loss.color,
                    }}>
                    <Text
                      style={{
                        backgroundColor: styles.loss.color,
                        color: this.props.theme.text,
                        padding: 6,
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}>
                      {token.percent.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              )
            }
            bottomDivider
          />
        ))}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.displayPL()}
          <ListItem
            key="add"
            containerStyle={{backgroundColor: this.props.theme.background}}
            bottomDivider
          />
        </ScrollView>
        <Overlay
          isVisible={this.state.visible}
          onBackdropPress={this.toggleOverlay}>
          {this.coinInput()}
        </Overlay>
        <View style={styles.addBtn}>
          <Icon
            raised
            reverse
            name="add"
            color={
              this.props.theme.card === DefaultTheme.colors.card
                ? '#000'
                : this.props.theme.card
            }
            size={25}
            onPress={this.toggleOverlay}
          />
        </View>
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
