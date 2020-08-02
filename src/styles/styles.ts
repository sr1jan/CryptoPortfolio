import {StyleSheet} from 'react-native';

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
  profit: {
    color: '#000080',
    fontWeight: 'bold',
    fontFamily: 'Hack',
  },
  loss: {
    color: '#c52a0d',
    fontWeight: 'bold',
  },
  androidButtonText: {
    margin: 5,
    fontSize: 15,
  },
  addBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 15,
    marginRight: 10,
  },
  input: {
    borderWidth: 0.5,
    height: 40,
  },
});
