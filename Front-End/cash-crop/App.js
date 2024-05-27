import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/login';
import RegisterScreen from './pages/register';


const Stack = createStackNavigator();


export default function App() {
 return (
 <NavigationContainer>
 <Stack.Navigator initialRouteName="Home">
 <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cash Crop' }} />
 <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
 </Stack.Navigator>
 </NavigationContainer>
 );
}
