import { AppRegistry } from 'react-native';
import App from './App';
import { StackNavigator } from 'react-navigation';
// import Camera from './Camera';

const Stack = StackNavigator({
  Home: { screen: App }
})

AppRegistry.registerComponent('camapp', () => App);
