import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function connectBluetooth({ navigation }) {
    const [isPlaying, setIsPlaying] = React.useState(true)

    return (
      <View style={styles.container}>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={10}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: false, delay: 2})}
      >
        {({ remainingTime, color }) => (
          <Text style={{ color, fontSize: 40 }}>
            {remainingTime}
          </Text>
        )}
      </CountdownCircleTimer>
      <Button title="Toggle Playing" onPress={() => setIsPlaying(prev => !prev)} />
    </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      height: "80%",
      width:"80%",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ecf0f1',
      padding: 8,
    }
  });