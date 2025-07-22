// index.js - MOBILE
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {App} from './App';
import 'react-native-get-random-values'
const snapshots = false;
if(snapshots){
  require('./indexSnapshot');
}
else {
  AppRegistry.registerComponent(appName, () => App);
}
