import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProfilePage = () => {
  let [user, setUser] = useState("");
  useEffect(() => {
    try {
      const res = fetch("http://localhost:8000/usuario/1")
        .then((res) => res.json())
        .then((data) => {
          setUser(data.message);
          console.log(user);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          {" "}
          {user.imagem_perfil != null ? (
            <>
              {" "}
              <Image
                source={{ uri: user.imagem_perfil }}
                style={styles.profilePicture}
              />{" "}
            </>
          ) : (
            <>
              <Image
                source={{
                  uri: "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
                }}
                style={styles.profilePicture}
              />
            </>
          )}
          <Text style={styles.nome}>{user.nome}</Text>{" "}
        </>
      ) : (
        <>
          {" "}
          <Image
            source={{
              uri: "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
            }}
            style={styles.profilePicture}
          />
          <Text style={styles.nome}>Teste</Text>{" "}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", // Cor de fundo escura
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff", // Cor do texto em branco
  },
});

export default ProfilePage;
