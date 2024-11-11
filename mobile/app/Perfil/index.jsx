import React from 'react';
import { View, Text, Image,  StyleSheet } from 'react-native';

const ProfilePage = () => {
  // Dados de exemplo
  const user = {
    name: 'John Doe',
    profilePicture: 'https://cdn2.iconfinder.com/data/icons/squircle-ui/32/Avatar-256.png',
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.userName}>{user.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Cor de fundo escura
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Cor do texto em branco
  },
});

export default ProfilePage;