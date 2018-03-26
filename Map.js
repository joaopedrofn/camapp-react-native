import React, { Component } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Image, Text, AsyncStorage, View, TouchableOpacity } from 'react-native';


export default class GoogleMap extends Component{
	constructor(props){
		super(props);

		this.state = {
			latitude: 0,
			longitude: 0,
			markers: [],
			view: null
		};
		AsyncStorage.getItem('pictures').then((pictures) => {
		  let markers = [];
		  for(picture of JSON.parse(pictures)){
		  	markers.push(
		  			<Marker coordinate={{
		  					latitude: picture.lat, 
		  					longitude: picture.lng
		  				}}
		  			>
		  				<Callout onPress={()=>this.setState({view: picture.file})}>
		  					<Text>({picture.x}, {picture.y}, {picture.z})</Text>
		  				</Callout>
		  			</Marker>
		  		)
		};
		this.setState({markers});
		
		});
		navigator.geolocation.getCurrentPosition((position) => {
			this.setState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		});
	}
	render(){
		const desc = "teste";
		if(!this.state.view)
			return (
					
					<MapView
					    initialRegion={{
					      latitude: this.state.latitude,
					      longitude: this.state.longitude,
					      latitudeDelta: 0.0922,
					      longitudeDelta: 0.0421,
					    }}
					    style={{
					      width: '100%',
					      height: '100%',
					      position: 'relative',
					      zIndex: -1
					    }}
					  >
					  {this.state.markers}
					  </MapView>
					
				);
		else{
			return (
				<View>
					<TouchableOpacity onPress={()=>this.setState({view: null})}>
						<Image 
							source={{uri: this.state.view}} 
							style={{
								width: '100%', 
								height: '100%'
							}}
							
						/>
					</TouchableOpacity>
				</View>
				);
		}
	}
};