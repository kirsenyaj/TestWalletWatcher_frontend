import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, Alert, Platform } from 'react-native'; // Added Platform
import axios from 'axios'; 
import { useIsFocused } from '@react-navigation/native';
import styles from '../styles'; 

export default function HomeScreen({ route, navigation }) {
  const { user_id, name } = route.params || {}; 
  const [expenses, setExpenses] = useState([]);
  const isFocused = useIsFocused();

  const API_URL = 'https://walletwatcher-backend-h1b7.onrender.com/registration/api/expenses/';

  const fetchExpenses = async () => {
    try {
      if (!user_id) return;
      const response = await axios.get(`${API_URL}?user_id=${user_id}`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (isFocused) fetchExpenses();
  }, [isFocused]);

  // --- LOGOUT FUNCTION (Web Compatible) ---
  const performLogout = () => {
    // Reset navigation stack to Login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      // 1. WEB BROWSER LOGOUT
      if (confirm("Are you sure you want to log out?")) {
        performLogout();
      }
    } else {
      // 2. MOBILE APP LOGOUT (Android/iOS)
      Alert.alert(
        "Log Out",
        "Are you sure you want to log out?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Log Out", 
            style: 'destructive',
            onPress: performLogout
          }
        ]
      );
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.listCard} 
      onPress={() => navigation.navigate('ExpenseDetail', { expense: item })}
    >
      <View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
      <Text style={styles.itemAmount}>₱{item.amount}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
        <Text style={styles.welcomeText}>Hello, {name}!</Text>
        <Button title="Log Out" color="red" onPress={handleLogout} />
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No expenses yet.</Text>}
      />

      <View style={{ marginTop: 10 }}>
        <Button 
          title="Add Expense" 
          color="#ff6b6b"
          onPress={() => navigation.navigate('AddExpense', { user_id: user_id })} 
        />
      </View>
    </View>
  );
}