import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Auth from './src/screens/Auth';
import Maps from './src/screens/Maps';

import { store } from './src/app/store';
import { addToken } from './src/reducers/authReducer';
import { Provider, useSelector, useDispatch } from 'react-redux';

function App() {
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addToken())
  }, []);
  return (
    <View style={styles.container}>
      { token ? <Maps /> : <Auth /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
