import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/login';
import RegisterScreen from './pages/register';
import DashboardScreen from './pages/userDashboard';
import AdminDashboardScreen from './pages/adminDashboard';
import Finances from './pages/finances';
import Tutorials from './pages/tutorials';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cash Crop' } } />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'AdminDashboard' }} />
        <Stack.Screen name="Finances" component={Finances} options={{ title: 'Finances' }} />
        <Stack.Screen name="Tutorials" component={Tutorials} options={{ title: 'Tutorials' }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
