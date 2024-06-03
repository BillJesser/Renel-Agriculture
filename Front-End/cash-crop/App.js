import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/login';
import RegisterScreen from './pages/register';
import DashboardScreen from './pages/userDashboard';
import AdminDashboardScreen from './pages/adminDashboard';
import Finances from './pages/finances';
import Tutorials from './pages/tutorials';
import SearchUser from './pages/adminSearch';

import ManageScreen from './pages/manage';

import Corn from './pages/corn';
import Soybeans from './pages/soybeans';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cash Crop' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard', headerLeft: null }} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'AdminDashboard' }} />
        <Stack.Screen name="Finances" component={Finances} options={{ title: 'Finances' }} />
        <Stack.Screen name="Tutorials" component={Tutorials} options={{ title: 'Tutorials' }} />
        <Stack.Screen name="Search" component={SearchUser} options={{ title: 'Search' }} />
        <Stack.Screen name="Manage" component={ManageScreen} options={{ title: 'Manage Accounts' }} />
        <Stack.Screen name="Corn" component={Corn} options={{ title: 'Corn' }} />
        <Stack.Screen name="Soybeans" component={Soybeans} options={{ title: 'Soybeans' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
