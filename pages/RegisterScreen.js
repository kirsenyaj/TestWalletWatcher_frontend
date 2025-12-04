import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native'; // Fixed import
import axios from 'axios';
import styles from '../styles'; // Assuming your global styles are here

export default function RegisterScreen({ navigation }) {

    // 1. State to hold all form data
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        // Removed gender if backend doesn't require it, keeping it clean
    });

    // 2. Your Backend URL (Verify this endpoint!)
    const API_URL = 'https://walletwatcher-backend-h1b7.onrender.com/registration/api/register/';

    // 3. Handle input changes dynamically
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    // 4. Function to send data to Backend
    const handleRegister = async () => {
        // Simple validation
        if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        try {
            console.log("Sending Registration Data:", formData);

            // POST request to your Django Backend
            const response = await axios.post(API_URL, {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password,
                // If your backend REQUIRES a 'username' field, you might need to
                // generate one or let the user type it. For now, we send what you asked.
                username: formData.email // Fallback: using email as username if needed
            });

            console.log("Success:", response.data);
            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate("Login"); // Go to Login after success

        } catch (error) {
            console.error("Registration Error:", error);
            if (error.response) {
                Alert.alert('Registration Failed', JSON.stringify(error.response.data));
            } else {
                Alert.alert('Error', 'Could not connect to server.');
            }
        }
    };

    return (
        <View style={styles.containerCenter}> 
            <View style={styles.card}>
                <Text style={styles.mainTitle}>User Registration</Text>

                <TextInput
                    style={styles.input}
                    placeholder='First Name'
                    value={formData.first_name}
                    onChangeText={(text) => handleChange('first_name', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Last Name'
                    value={formData.last_name}
                    onChangeText={(text) => handleChange('last_name', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                />

                {/* Button triggers the API call, not just navigation */}
                <Button
                    title="Register"
                    color="#ff6b6b"
                    onPress={handleRegister} 
                />
                
                {/* Back to Login Link */}
                <Button 
                    title="Back to Login" 
                    color="#666" 
                    onPress={() => navigation.navigate("Login")} 
                />
            </View>
        </View>
    );
}