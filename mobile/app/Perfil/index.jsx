import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";


const ProfilePage = () => {
  let [user, setUser] = useState("");
  let [image, setImage] = useState("");

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

  useEffect(() => {
    try {
      uploadCloudinary()
    } catch (error) {
      console.log(error)
    }
  },[user.imagem_perfil])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setUser({...user, imagem_perfil: result.assets[0].uri});
      console.log(result.assets[0].uri)
    }
  };

  async function uploadCloudinary(){
    const data = {file: image, upload_preset: 'ml_default'}
    const res = await fetch('https://api.cloudinary.com/v1_1/demtbhzpa/upload', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data)
    });
    let response = await res.json();
    console.log(response)
    const data2 = {email: user.email, url: response.url}
    const res2 = await fetch(`http://localhost:8000/usuario/${user.email}/updateImagem`, {method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data2)})
    let response2 = await res2.json()
    console.log(response2)
  }
 

  return (
    <View style={styles.container}>
      {user ? (
        <>
          {" "}
          {user.imagem_perfil != null ? (
            <>
              {" "}
              <Pressable onPress={pickImage}>
                <Image
                  source={{ uri: user.imagem_perfil }}
                  style={styles.profilePicture}
                />
              </Pressable>{" "}
            </>
          ) : (
            <>
              <Pressable onPress={pickImage}>
                <Image
                  source={{
                    uri: "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
                  }}
                  style={styles.profilePicture}
                />
              </Pressable>
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
