import React, {Component} from 'react';
import {View, Text, Alert, TextInput} from 'react-native';
import {Button, Overlay, Icon, ListItem} from 'react-native-elements';

import {styles} from '../../styles/styles';
import {useTheme, DefaultTheme} from '@react-navigation/native';

const URL = 'https://api.wazirx.com/api/v2/tickers';

export default function Port() {
  const {colors} = useTheme();
  return <Portfolio theme={colors} />;
}

interface token_prop {
  id: number;
  coin: string;
  market: string;
  amount: number;
  price: number;
  boughtVal: number;
  profit: number;
  loss: number;
}

interface theme_prop {
  theme: object;
}

// interface IProps {
//   tp: token_prop;
//   theme: theme_prop;
// }

interface PortStates {
  token: token_prop[];
  visible: boolean;
  counter: number;
}

class Portfolio extends Component<theme_prop, PortStates> {
  constructor(props: theme_prop) {
    super(props);
    this.state = {
      token: [],
      visible: false,
      counter: 0,
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
  };

  _interval: any;

  componentDidMount() {
    this.priceUpdate();
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  toggleOverlay = () => {
    this.setState({visible: !this.state.visible});
  };

  submit = (token_object: token_prop) => {
    if (
      !token_object.amount ||
      !token_object.price ||
      token_object.coin === '' ||
      token_object.market === ''
    ) {
      Alert.alert('Error', 'Please fill in all the required details');
    } else {
      token_object.id = this.state.counter + 1;
      this.setState({
        counter: this.state.counter + 1,
      });
      this.newCoin(token_object);
      this.toggleOverlay();
    }
  };

  async fetchData() {
    const response = await fetch(URL);
    const json = await response.json();
    return json;
  }

  priceUpdate = () => {
    this._interval = setInterval(async () => {
      if (this.state.token.length === 0) return;
      const json = await this.fetchData();
      this.state.token.map(token_object => {
        const idx = token_object.id - 1;
        const name = token_object.coin + token_object.market;
        const curPrice = json[name].last;
        const curVal = curPrice * token_object.amount;
        const token = [...this.state.token];
        if (curVal > token_object.boughtVal) {
          const profit = curVal - token_object.boughtVal;
          if (parseFloat(profit.toFixed(2)) === token_object.profit) return;
          token[idx] = {
            ...token[idx],
            profit: parseFloat(profit.toFixed(2)),
            loss: 0,
          };
          this.setState({token});
          console.log(`${profit} price changed`);
        } else {
          const loss = token_object.boughtVal - curVal;
          if (parseFloat(loss.toFixed(2)) === token_object.loss) return;
          token[idx] = {
            ...token[idx],
            loss: parseFloat(loss.toFixed(2)),
            profit: 0,
          };
          this.setState({token});
          console.log(`${loss} price changed`);
        }
      });
    }, 10000);
  };

  newCoin = async (token_object: token_prop) => {
    const json = await this.fetchData();
    const name = token_object.coin + token_object.market;
    const idx = token_object.id - 1;
    try {
      const curPrice = json[name].last;
      const curVal = curPrice * token_object.amount;
      const boughtVal = token_object.amount * token_object.price;
      token_object.boughtVal = boughtVal;
      this.setState({token: [...this.state.token, token_object]});
      const token = [...this.state.token];
      if (curVal > boughtVal) {
        const profit = curVal - boughtVal;
        token[idx] = {
          ...token[idx],
          profit: parseFloat(profit.toFixed(2)),
          loss: 0,
        };
        this.setState({token});
      } else {
        const loss = boughtVal - curVal;
        token[idx] = {
          ...token[idx],
          loss: parseFloat(loss.toFixed(2)),
          profit: 0,
        };
        this.setState({token});
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Invalid Input', 'Try again with correct details');
    }
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
    if (this.state.token.length === 0) return;
    console.log(this.state.token.length);
    return (
      <View>
        {this.state.token.map((token, i) => (
          <ListItem
            key={i}
            containerStyle={{backgroundColor: this.props.theme.backgroundColor}}
            title={token.coin.toUpperCase()}
            titleStyle={{fontWeight: 'bold', color: this.props.theme.text}}
            subtitle={token.market.toUpperCase()}
            subtitleStyle={{color: this.props.theme.text}}
            rightElement={
              token.profit > 0 ? (
                <Text style={{color: this.props.theme.text}}>
                  +{token.profit}
                </Text>
              ) : (
                <Text style={{color: this.props.theme.text}}>
                  -{token.loss}
                </Text>
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
        {this.displayPL()}
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
