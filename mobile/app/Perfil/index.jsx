import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const ProfilePage = () => {
  let [user, setUser] = useState("");
  let [image, setImage] = useState("");

  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    try {
      let id = localStorage.getItem("id");
      console.log(id);
      const res = fetch(`http://localhost:8000/usuario/${id}`)
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
      uploadCloudinary();
    } catch (error) {
      console.log(error);
    }
  }, [user.imagem_perfil]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setUser({ ...user, imagem_perfil: result.assets[0].uri });
      console.log(result.assets[0].uri);
    }
  };

  async function uploadCloudinary() {
    const data = { file: image, upload_preset: "ml_default" };
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/demtbhzpa/upload",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await res.json();
    console.log(response);
    const data2 = { email: user.email, url: response.url };
    const res2 = await fetch(
      `http://localhost:8000/usuario/${user.email}/updateImagem`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(data2),
      }
    );
    let response2 = await res2.json();
    console.log(response2);
  }

  const trocarSenha = async () => {
    if (!password || !confirmPassword) {
      alert("Preencha os campos de senha");
      return;
    }
    if (password == confirmPassword) {
      const data = { email: user.email, senha: password };
      try {
        let res = await fetch(
          `https://localhost:8000/usuario/${user.email}/updatePassword`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        let response = await res.json();
        console.log(response);
      } catch (error) {
        console.log();
      }
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          {user.imagem_perfil != null ? (
            <Pressable onPress={pickImage}>
              <Image
                source={{ uri: user.imagem_perfil }}
                style={styles.profilePicture}
              />
            </Pressable>
          ) : (
            <Pressable onPress={pickImage}>
              <Image
                source={{
                  uri: "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
                }}
                style={styles.profilePicture}
              />
            </Pressable>
          )}
          <Text style={styles.userName}>{user.nome}</Text>
          <Text style={styles.userName}>{user.sobrenome}</Text>
          <Text style={styles.userInfo}>{user.dataNascimento}</Text>
          <Text style={styles.userInfo}>{user.email}</Text>
          <View style={styles.section}>
            <TextInput
              style={styles.input}
              placeholder="Nova senha"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={true}
            />
            <Pressable style={styles.button} onPress={trocarSenha}>
              <Text style={styles.buttonText}>Trocar senha</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Image
            source={{
              uri: "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
            }}
            style={styles.profilePicture}
          />
          <Text style={styles.userName}>Teste</Text>
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
    backgroundColor: "#121212", // Fundo escuro
    padding: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FFFFFF", // Borda branca ao redor da imagem
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", // Nome em branco
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 16,
    color: "#B0B0B0", // Texto de informações em cinza claro
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#1E1E1E", // Fundo do input
    color: "#FFFFFF", // Texto do input em branco
  },
  button: {
    backgroundColor: "#a80000", // Cor do botão
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF", // Texto do botão em branco
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    width: "100%",
    marginVertical: 15,
    alignItems: "center",
  },
});

export default ProfilePage;
