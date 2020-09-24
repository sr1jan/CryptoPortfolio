import {StyleSheet} from 'react-native';

let MyTheme = {
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
  addCoinContainer: {
    backgroundColor: '#393e46',
    paddingTop: 2,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addCoinLeftComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  addCoinText: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Recursive',
    fontStyle: 'italic',
    color: '#fff',
    textAlign: 'left',
    letterSpacing: 1,
    marginLeft: 10,
  },
  grText: {
    color: '#fff',
    textAlign: 'left',
    letterSpacing: 1.8,
    fontWeight: 'bold',
    fontSize: 9,
    fontFamily: 'Recursive',
  },
  grContainer: {
    flexDirection: 'column',
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
    paddingVertical: 13,
  },
  coinView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
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
  profit: {
    color: '#fff',
    fontFamily: 'Recursive',
    marginRight: 4,
  },
  profitConversion: {
    color: '#32CD32',
    fontWeight: '100',
    fontSize: 12,
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
    fontSize: 12,
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
    // borderColor: '#fff',
    // borderWidth: 0.3,
    // borderRadius: 3,
    // paddingHorizontal: 50,
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
});
