import React, { Component } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

var width = Dimensions.get('window').width; 

export default class DefaultButton extends Component {
    render = () => {
      return (
        <View>
          <TouchableOpacity
            style={{
              width: width * .8,
              height: 50,
              backgroundColor: "#1E3160",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={this.props.onPress}
          >
            <Text style={{color: 'white'}}>{this.props.text}</Text>
          </TouchableOpacity>
        </View>
      );
    }
}