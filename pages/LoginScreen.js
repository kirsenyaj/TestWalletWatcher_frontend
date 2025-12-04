import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native'; // Added TouchableOpacity
import axios from 'axios';
import styles from '../styles'; 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const API_URL = 'https://walletwatcher-backend-h1b7.onrender.com/registration/api/login/';

  const handleLogin = async () => {
    try {
      const response = await axios.post(API_URL, { email, password });
      navigation.replace('Home', { 
        user_id: response.data.user_id,
        name: response.data.name 
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.containerCenter}>
      <Text style={styles.mainTitle}>WALLET WATCHER</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input} 
          value={email} 
          onChangeText={setEmail} 
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput 
          style={styles.input} 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />
        <Button title="Login" color="#ff6b6b" onPress={handleLogin} />

        {/* NEW BUTTON TO GO TO REGISTER */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}