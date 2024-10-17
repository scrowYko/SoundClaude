import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme, Image } from 'react-native';
import { Link } from 'expo-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();

  const handleLogin = () => {
    // Add your login logic here
    console.log(`Email: ${email}, Password: ${password}`);
  };

  const handleForgotPassword = () => {
    // Add your forgot password logic here
    console.log('Forgot password clicked');
  };

  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={[styles.background, isDarkMode && styles.darkBackground]}>
        <Image source={{uri: 'https://i1.sndcdn.com/avatars-69H9MhsAT5XDDltu-1X6yHw-t240x240.jpg'}} style={styles.image} />
        <Text style={[styles.title, isDarkMode && styles.darkText]}>Login</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder="Email"
          placeholderTextColor={isDarkMode ? '#888' : '#999'}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder="Password"
          placeholderTextColor={isDarkMode ? '#888' : '#999'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={[styles.forgotPassword, isDarkMode && styles.darkAccent]} onPress={handleForgotPassword}>
          Forgot Password?
        </Text>
        <Text style={[styles.registerText, isDarkMode && styles.darkText]}>
          Don't have an account?
          <Link href="Register" style={[styles.registerLink, isDarkMode && styles.darkAccent]}>
            Register here
          </Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: 250,
    color: '#000',
  },
  darkInput: {
    borderColor: '#444',
    color: '#fff',
    backgroundColor: '#333',
  },
  loginButton: {
    backgroundColor: '#00bf73',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  forgotPassword: {
    fontSize: 16,
    color: '#00bf73',
    marginBottom: 10,
  },
  darkAccent: {
    color: '#00ff99',
  },
  registerText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  registerLink: {
    fontSize: 16,
    color: '#00bf73',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default Login;