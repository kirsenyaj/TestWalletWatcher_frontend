import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Pages
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen'; // <--- NEW IMPORT
import HomeScreen from './pages/HomeScreen';
import AddExpenseScreen from './pages/AddExpenseScreen';
import ExpenseDetailScreen from './pages/ExpenseDetailScreen';

const Stack = createStackNavigator();

export default function Dashboard() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        
        {/* NEW REGISTER SCREEN */}
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Wallet Watcher', headerLeft: null }} 
        />
        <Stack.Screen 
          name="AddExpense" 
          component={AddExpenseScreen} 
          options={{ title: 'Add New Expense' }} 
        />
        <Stack.Screen 
          name="ExpenseDetail" 
          component={ExpenseDetailScreen} 
          options={{ title: 'Transaction Details' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}