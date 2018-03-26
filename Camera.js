import React, { Component } from 'react';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Camera extends Component{
	const { navigate } = this.props.navigation;
	render(){
		return (
				<View>
					<RNCamera
			            ref={ref => {
			              this.camera = ref;
			            }}
			            style = {styles.preview}
			            type={RNCamera.Constants.Type.back}
			            flashMode={RNCamera.Constants.FlashMode.on}
			            permissionDialogTitle={'Permission to use camera'}
			            permissionDialogMessage={
			            	'We need your permission to use your camera phone'
			            }
			        />
			        <View style={{
			        		flex: 0, 
			        		flexDirection: 'row', 
			        		justifyContent: 'center'
			        	}}>
				        <TouchableOpacity
				            onPress={this.takePicture.bind(this)}
				            style = {styles.capture}
				        >
				            <Text style={{fontSize: 14}}> SNAP </Text>
				        </TouchableOpacity>
			        </View>
				</View>
			);
	}
	takePicture = async function() {
	    if (this.camera) {
	      const options = { quality: 0.5, base64: true };
	      const data = await this.camera.takePictureAsync(options)
	      console.log(data.uri);
	      navigate('Home');
	    }
	  };
	}
}