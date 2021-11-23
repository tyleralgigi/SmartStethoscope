import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import help from './src/views/help';
import home from './src/views/home';
//views
import signIn from './src/views/signIn';


const Stack = createNativeStackNavigator();
var isLoggedIn = false;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {isLoggedIn ? (
          //After Auth
          <Stack.Group>
            <Stack.Screen name="Home"
              component={home}/>
          </Stack.Group>
        ):(
          //Auth Screens
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="signIn"
              component={signIn}/>
          </Stack.Group>
        )}
        {/*Common popup screens*/}
        <Stack.Group screenOptions={{presentation:'modal'}}>
          <Stack.Screen name="Help"
              component={help}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
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
