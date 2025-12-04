import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import styles from '../styles';

export default function AddExpenseScreen({ route, navigation }) {
  const { user_id } = route.params;
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const API_URL = 'https://walletwatcher-backend-h1b7.onrender.com/registration/api/expenses/';

  const handleSubmit = async () => {
    try {
      await axios.post(API_URL, {
        user: user_id,
        title: title,
        amount: parseFloat(amount),
        category: category
      });
      Alert.alert('Success', 'Expense Added!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not save expense');
    }
  };

  return (
    <View style={styles.containerCenter}>
      <View style={styles.card}>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} placeholder="e.g. Lunch, Angeles to UA CSFP" value={title} onChangeText={setTitle} />
        
        <Text style={styles.label}>Amount</Text>
        <TextInput 
          style={styles.input} 
          placeholder="100.00"
          keyboardType="numeric" 
          value={amount} 
          onChangeText={setAmount} 
        />
        
        <Text style={styles.label}>Category</Text>
        <TextInput style={styles.input} placeholder="e.g. Food, Transport" value={category} onChangeText={setCategory} />
        
        <Button title="Save Expense" color="#ff6b6b" onPress={handleSubmit} />
      </View>
    </View>
  );
}