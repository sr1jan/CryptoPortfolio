import {StyleSheet, I18nManager} from 'react-native';
import {material} from 'react-native-typography';

export const PROFIT_COLOR = '#32CD32';
export const LOSS_COLOR = '#c52a0d';

export const currencySign = {
  ['inr']: '\u20b9',
  ['usdt']: '\u0024',
  ['btc']: '\u20bf',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    padding: 5,
    width: '94%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  addCoinHomeText: {
    color: 'grey',
    fontFamily: 'monospace',
    fontSize: 13,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  addCoinHomeTouchable: {
    borderRadius: 3,
    backgroundColor: '#393e46',
    marginTop: 8,
  },
  addCoinContainer: {
    backgroundColor: '#393e46',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addCoinLeftComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  grContainer: {
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  grAmount: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Recursive',
    letterSpacing: 0.5,
    marginBottom: 1,
  },
  grPercent: {
    color: '#fff',
    fontFamily: 'Recursive',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  coinList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
  },
  coinTitle: {
    color: '#fff',
    fontFamily: 'Recursive',
    fontSize: 18,
    letterSpacing: 1,
  },
  coinSub: {
    color: 'grey',
    fontSize: 12,
    fontWeight: '100',
    fontFamily: 'Recursive',
    letterSpacing: 1,
  },
  coinView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profit: {
    color: '#fff',
    fontFamily: 'Recursive',
    marginRight: 4,
  },
  profitConversion: {
    color: '#32CD32',
    fontWeight: '100',
    fontSize: 10,
    marginRight: 4,
  },
  profitPercent: {
    backgroundColor: '#32CD32',
    color: '#fff',
    padding: 6,
    fontSize: 14,
  },
  profitBox: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#32CD32',
  },
  loss: {
    color: '#fff',
    fontFamily: 'Recursive',
    marginRight: 4,
  },
  lossConversion: {
    color: '#c52a0d',
    fontWeight: '100',
    fontSize: 10,
    marginRight: 4,
  },
  lossPercent: {
    backgroundColor: '#c52a0d',
    color: '#fff',
    padding: 6,
    fontSize: 14,
  },
  lossBox: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#c52a0d',
  },
  androidButtonText: {
    margin: 5,
    fontSize: 15,
  },
  addBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 0,
    marginRight: 10,
  },
  input: {
    borderWidth: 0.5,
    height: 40,
  },
  coinInput: {
    ...material.captionObject,
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 1,
  },
  dropDownBox: {
    height: 80,
    paddingHorizontal: 50,
  },
  dropDownView: {
    height: 26,
    backgroundColor: '#393e46',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    width: '100%',
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    // backgroundColor: '#dd2c00',
    justifyContent: 'flex-end',
    height: 70,
  },
  leftAction: {
    backgroundColor: '#388e3c',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    height: 70,
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  modalMain: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    marginHorizontal: 26,
    paddingHorizontal: 20,
    paddingVertical: 25,
    elevation: 10,
  },
});
