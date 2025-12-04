import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import styles from '../styles';

export default function ExpenseDetailScreen({ route, navigation }) {
  // Get the initial expense data passed from Home
  const { expense } = route.params;

  // State to handle "Edit Mode"
  const [isEditing, setIsEditing] = useState(false);

  // State for the form fields (initialize with existing data)
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState(expense.category);

  // API URL
  const API_URL = 'https://walletwatcher-backend-h1b7.onrender.com/registration/api/expenses/';

  // --- DELETE FUNCTION ---
  const handleDelete = async () => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}${expense.id}/`);
              Alert.alert('Success', 'Deleted successfully');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete');
            }
          }
        }
      ]
    );
  };

  // --- SAVE / UPDATE FUNCTION ---
  const handleSave = async () => {
    try {
      // Validate inputs
      if (!title || !amount || !category) {
        Alert.alert('Error', 'Fields cannot be empty');
        return;
      }

      // Send PUT request to update
      await axios.put(`${API_URL}${expense.id}/`, {
        user: expense.user, // Keep the same user owner
        title: title,
        amount: parseFloat(amount),
        category: category,
        date: expense.date // Keep original date or update if your backend supports it
      });

      Alert.alert('Success', 'Expense Updated!');
      setIsEditing(false); // Exit edit mode
      navigation.goBack(); // Go back to Home to see changes
    } catch (error) {
      console.error(error);
      Alert.alert('Update Failed', 'Could not save changes.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.containerCenter}>
      <View style={styles.card}>
        
        {/* --- TITLE HEADER --- */}
        <Text style={styles.mainTitle}>
          {isEditing ? "Edit Expense" : "Transaction Details"}
        </Text>

        {/* --- FORM OR VIEW MODE --- */}
        {isEditing ? (
          // === EDIT MODE (Inputs) ===
          <>
            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} />

            <Text style={styles.label}>Category</Text>
            <TextInput style={styles.input} value={category} onChangeText={setCategory} />

            <Text style={styles.label}>Amount</Text>
            <TextInput 
              style={styles.input} 
              value={amount} 
              onChangeText={setAmount} 
              keyboardType="numeric"
            />

            {/* Save & Cancel Buttons */}
            <View style={{ gap: 10, marginTop: 10 }}>
              <Button title="Save Changes" color="#4CAF50" onPress={handleSave} />
              <Button title="Cancel" color="#666" onPress={() => setIsEditing(false)} />
            </View>
          </>
        ) : (
          // === VIEW MODE (Text) ===
          <>
            <Text style={styles.detailLabel}>Title:</Text>
            <Text style={styles.detailValue}>{title}</Text>
            
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{category}</Text>
            
            <Text style={styles.detailLabel}>Amount:</Text>
            <Text style={styles.detailValue}>₱{amount}</Text>
            
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>{expense.date}</Text>

            {/* Edit & Delete Buttons */}
            <View style={{ gap: 10, marginTop: 20 }}>
              <Button title="Edit Expense" color="#2196F3" onPress={() => setIsEditing(true)} />
              <Button title="Delete Entry" color="red" onPress={handleDelete} />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}