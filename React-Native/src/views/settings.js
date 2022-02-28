import { StatusBar } from 'expo-status-bar';
import { signOut } from 'firebase/auth';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DefaultButton from '../components/InvertedButton';
import { auth } from '../other/js/firebase';
export default function settings({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Setting</Text>
      <DefaultButton text="Sign Out" onPress={()=> signOut(auth)}/>
      <StatusBar style="auto" />
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
