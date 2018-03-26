/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import MapView from 'react-native-maps';
import Bar from './Bar';
import GoogleMap from './Map';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import RNSensors from 'react-native-sensors';

const { Accelerometer, Gyroscope } = RNSensors;
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {pictures: []}
    
  }
  takePicture(){
    var options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchCamera(options, (response) => {
      if(response.didCancel) return;
      navigator.geolocation.getCurrentPosition((pos) => {
        AsyncStorage.getItem("pictures").then((pictures) => {
          alert(pictures);
          new Accelerometer({}).then((acceleration) => {
            acceleration.map(({ x, y, z }) => { return {x, y,z}; })
              .subscribe((acc) =>{
                if(pictures == null) pictures = [{
                                                  file: response.uri, 
                                                  lat: pos.coords.latitude, 
                                                  lng: pos.coords.longitude, 
                                                  x: acc.x, 
                                                  y: acc.y, 
                                                  z: acc.z
                                                }];
                else{
                  pictures = JSON.parse(pictures);
                  try{
                    pictures.push({
                      file: response.uri,
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude,
                      x: acc.x,
                      y: acc.y,
                      z: acc.z
                    });
                  } catch(err) {
                    alert(JSON.stringify(err));
                  }
                }
                AsyncStorage.setItem('pictures', JSON.stringify(pictures));
                acceleration.stop();
              });
          });
        });
      });
      });
  }
  render() {
    
    return (
      <View>
        <Bar />
        <GoogleMap pictures={this.state.pictures} />
        <TouchableOpacity
          style={{
              alignItems:'center',
              justifyContent:'center',
              width:80,
              height:80,
              backgroundColor:'#3498db',
              borderRadius:100,
              position: 'absolute',
              bottom: 100,
              left: '50%',
              zIndex: 10,
              marginLeft: -40
          }}
          onPress={this.takePicture}
        >
          <Icon name={"camera"}  size={30} color="#fff" style={{fontSize: 25}} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
