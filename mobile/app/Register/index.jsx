import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [bday, setBday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    console.log(
      `Name: ${name}, Surname: ${surname}, Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}`
    );
  };

  const autoBirthdayFormater = (text) => {
    // Remove caracteres que não são dígitos
    const cleanedText = text.replace(/\D/g, ''); //não sei o pq funciona só funciona
  
    
    let formattedText = '';
    if (cleanedText.length > 0) {
      formattedText += cleanedText.substring(0, 2); // Dia
    }
    if (cleanedText.length >= 2) {
      formattedText += '/';
      formattedText += cleanedText.substring(2, 4); // Mês
    }
    if (cleanedText.length >= 4) {
      formattedText += '/';
      formattedText += cleanedText.substring(4, 8); // Ano
    }
  
    setBday(formattedText);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://i1.sndcdn.com/avatars-69H9MhsAT5XDDltu-1X6yHw-t240x240.jpg",
        }}
        style={styles.image}
      />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#808080"
        value={name}
        onChangeText={(text) => setName(text)}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        placeholderTextColor="#808080"
        value={surname}
        onChangeText={(text) => setSurname(text)}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Birthday(dd/mm/yyyy)"
        placeholderTextColor="#808080"
        value={bday}
        onChangeText={(text) => autoBirthdayFormater(text)}
        inputMode="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#808080"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        inputMode="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#808080"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#808080"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    color: "#ffffff",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#333333",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    color: "#ffffff",
    backgroundColor: "#1e1e1e",
  },
  button: {
    backgroundColor: "#00bf73",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "#121212",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default Register;
