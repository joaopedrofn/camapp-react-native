import React, { Component } from 'react';
import { Text } from 'react-native';

export default Bar = (props) => {
	return (
	    <Text 
	      style={{
	        paddingLeft:10,
	        fontWeight: 'bold',
	        width: '100%', 
	        height: 70, 
	        lineHeight:70
	      }}
	    >CaMapp {props.text}
	    </Text>
	);
};