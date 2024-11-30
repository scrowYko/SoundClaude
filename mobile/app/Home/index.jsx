import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; 
import { Link, router } from "expo-router";

const Home = () => {
  const [user, setUser] = useState("");
  const navigation = useNavigation(); []

  useEffect(() => {
    try {
      let id = localStorage.getItem("id");
      console.log(id);
      const res = fetch(`http://localhost:8000/usuario/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data.message);
          console.log(data.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const items = [
    {
      id: 1,
      name: "Rap",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSKnlPOSoqXCmsLrYDzd44ih2zBJJOx1LQ0pLVv5XC53GosLPZC",
    },
    {
      id: 2,
      name: "Trap",
      image:
        "https://s2-g1.glbimg.com/edM1HJtDGbHdDXZvhIJfUGiyWrA=/0x0:1080x1350/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/9/G/qfvEJ5Qdiq18A4BKQGJQ/matue4.jpg",
    },
    {
      id: 3,
      name: "Funk",
      image:
        "https://uploads.metroimg.com/wp-content/uploads/2021/05/17075645/MC-Kevin6.jpg",
    },
    {
      id: 4,
      name: "Reggae",
      image:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTmeVzbvGefsTWXV6OCRlSEnL8M5AeKj4ZncpIdgEe_DFZMd4jGXuH2GLNdoBwRAMNF36OujuxSafKZGaKYcvDIug",
    },
  ];

  function clickPerfil() {
    router.replace("/Perfil");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {user ? (
          <>
            {user.imagem_perfil != null ? (
              <>
                <Pressable onPress={() => clickPerfil()}>
                  <Image
                    source={{ uri: user.imagem_perfil }}
                    style={styles.user_image}
                  />
                </Pressable>
              </>
            ) : (
              <>
                <Pressable onPress={() => clickPerfil()}>
                  <Ionicons
                    name="person-circle-outline"
                    size={28}
                    color="#282828"
                  />
                </Pressable>
              </>
            )}
          </>
        ) : (
          <></>
        )}

        <TextInput
          style={styles.searchBar}
          placeholder="Pesquisar..."
          placeholderTextColor="#AFAFAF"
        />
        <Ionicons name="home-outline" size={20} color="#FFFFFF" />
      </View>
      <Text style={styles.sectionTitle}>Artistas populares:</Text>
      <View style={styles.grid}>
        {[
          "https://thisis-images.spotifycdn.com/37i9dQZF1DZ06evO2sUkRq-default.jpg",
          "https://thisis-images.spotifycdn.com/37i9dQZF1DZ06evO0FsQXS-default.jpg",
          "https://thisis-images.spotifycdn.com/37i9dQZF1DZ06evO1vscg0-default.jpg",
        ].map((imageUri, index) => (
          <Image
            key={index}
            style={styles.circleCard}
            source={{ uri: imageUri }}
          />
        ))}
      </View>
      <Text style={styles.sectionTitle}>Você pode gostar:</Text>
      {items.map((item) => (
        <Pressable
          key={item.id}
          style={styles.card}
          onPress={() =>
            navigation.navigate("Player", {
              name: item.name,
              image: item.image,
            })
          }
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.text}>{item.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Um fundo mais escuro para uma aparência moderna
    padding: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Alinhamento mais eficiente
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: "#00bf73",
    borderRadius: 5,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    color: "#000000",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    elevation: 2, // Sombra para dar profundidade
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  text: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  circleCard: {
    width: "30%", // Ajuste para melhor espaçamento
    aspectRatio: 1,
    borderRadius: 50,
    marginBottom: 15,
    overflow: "hidden", // Para garantir que a imagem não exceda o círculo
    borderWidth: 1, // Adicionando uma borda sutil
    borderColor: "#FFFFFF", // Cor da borda
  },
  user_image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default Home;
