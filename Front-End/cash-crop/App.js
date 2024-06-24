// App.js
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
import UserTransactions from './pages/userTransactions';
import ManageScreen from './pages/manage';
import Corn from './pages/corn';
import Soybeans from './pages/soybeans';
import AddClient from './pages/addClient';
import AddAdmin from './pages/addAdmin';
import EditUser from './pages/editUser';
import AccountInfo from './pages/accountInfo';
import InputData from './pages/inputData';
import { IpProvider } from './IpContext';
import LoginTutorials from './pages/loginTutorial';
import UserTutorial from './pages/userTutorial';
import AdminTutorial from './pages/adminTutorial';
import AdminInputData from './pages/adminInputData';
import Groundnut from './pages/groundnut';
import Rice from './pages/rice';
import EditUserFinances from './pages/editUserFinances'

const Stack = createStackNavigator();
const ipAddress = '192.168.1.73:5000';  

export default function App() {
  return (

    <IpProvider initialIp={ipAddress}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cash Crop' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard', headerLeft: null }} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'AdminDashboard', headerLeft: null }} />
          <Stack.Screen name="Finances" component={Finances} options={{ title: 'Finances' }} />
          <Stack.Screen name="Tutorials" component={Tutorials} options={{ title: 'Tutorials' }} />
          <Stack.Screen name="Search" component={SearchUser} options={{ title: 'Search' }} />
          <Stack.Screen name="UserTransactions" component={UserTransactions} options={{ title: 'User Transactions' }} />
          <Stack.Screen name="Manage" component={ManageScreen} options={{ title: 'Manage Accounts' }} />
          <Stack.Screen name="Corn" component={Corn} options={{ title: 'Corn' }} />
          <Stack.Screen name="Soybeans" component={Soybeans} options={{ title: 'Soybeans' }} />
          <Stack.Screen name="Add Client" component={AddClient} options={{ title: 'Add Client' }} />
          <Stack.Screen name="Add Admin" component={AddAdmin} options={{ title: 'Add Admin' }} />
          <Stack.Screen name="Edit User" component={EditUser} options={{ title: 'Edit User' }} />
          <Stack.Screen name="AccountInfo" component={AccountInfo} options={{ title: 'Account Info' }} />
          <Stack.Screen name="LoginTutorial" component={LoginTutorials} options={{ title: 'Login Tutorial' }} />
          <Stack.Screen name="InputData" component={InputData} options={{ title: 'Input Data' }} />
          <Stack.Screen name="UserTutorial" component={UserTutorial} options={{ title: 'User Tutorial' }} />
          <Stack.Screen name="AdminTutorial" component={AdminTutorial} options={{ title: 'Admin Tutorial' }} />
          <Stack.Screen name="AdminInputData" component={AdminInputData} options={{ title: 'Admin Input Data' }} />
          <Stack.Screen name="Groundnut" component={Groundnut} options={{ title: 'Groundnut' }} />
          <Stack.Screen name="Rice" component={Rice} options={{ title: 'Rice' }} />
          <Stack.Screen name="EditUserFinances" component={EditUserFinances} options={{ title: 'Edit User Finances' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </IpProvider>

  );
}
