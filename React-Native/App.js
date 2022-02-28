
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { auth } from './src/other/js/firebase';
import createAccount from './src/views/createAccount';
import forgotPassword from './src/views/forgotPassword';
import help from './src/views/help';
import home from './src/views/home';
import recordingScreen from './src/views/recrodingScreen';
import settings from './src/views/settings';
import signIn from './src/views/signIn';
const Stack = createNativeStackNavigator();


export default function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  

  // Listen for authentication state to change.
  onAuthStateChanged(auth, user => {
    if (user != null) {
      console.log('We are authenticated now!');
      setIsLoggedIn(true);
    }else{
      console.log('Not authenticated')
      setIsLoggedIn(false);
    }

    // Do other things
  });


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {isLoggedIn ? (
          //After Auth
          <Stack.Group>
            <Stack.Screen name="Home"
              component={home}/>
              
            <Stack.Group>
              <Stack.Screen name="recordingScreen" component={recordingScreen}/>
            </Stack.Group>
            <Stack.Screen name="Settings"
              component={settings}/>
          </Stack.Group>
        ):(
          //Auth Screens
          <Stack.Group >
            <Stack.Screen name="signIn"
              component={signIn}
              options={{headerShown: false}}/>
            <Stack.Screen name="createAccount" 
              component={createAccount} 
              options={{
                title: 'Create An Acccount',
                headerBackTitle: 'Back'
                }}/>
            <Stack.Screen name="forgotPassword"
              component={forgotPassword} 
              options={{
                title: 'Forgot Password',
                headerBackTitle: 'Back'
                }}
            />
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
