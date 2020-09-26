import {StyleSheet, I18nManager} from 'react-native';

export const MyTheme = {
  primary: '#3c3c3d',
  background: '#222831',
  card: '#393e46',
  text: '#fff',
  border: 'rgb(199, 199, 204)',
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
  title: {
    fontSize: 22,
    marginBottom: 10,
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
    paddingHorizontal: 3,
  },
  coinList: {
    backgroundColor: MyTheme.background,
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
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'monospace',
    color: '#fff',
  },
  dropDownBox: {
    height: 85,
    paddingHorizontal: 50,
  },
  dropDownView: {
    height: 30,
    backgroundColor: '#222831',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  submitText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'monospace',
    paddingVertical: 5,
    paddingHorizontal: 30,
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
    backgroundColor: '#000',
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end',
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#388e3c',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
});
