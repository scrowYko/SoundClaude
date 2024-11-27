import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  const [categorias, setCategorias] = useState([
    { id: 1, nome: 'Pop' },
    { id: 2, nome: 'Rock' },
    { id: 3, nome: 'Hip-Hop' },
  ]);

  const [recomendacoes, setRecomendacoes] = useState([
    { id: 1, nome: 'Música 1' },
    { id: 2, nome: 'Música 2' },
    { id: 3, nome: 'Música 3' },
  ]);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity>
          <Text>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Biblioteca</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Configurações</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>Destaque</Text>
        <Image source={{ uri: 'https://example.com/imagem.jpg' }} style={{ width: 100, height: 100 }} />
      </View>
      <FlatList
        data={categorias}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text>{item.nome}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={{ marginTop: 20 }}>
        <Text>Recomendações</Text>
        <FlatList
          data={recomendacoes}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text>{item.nome}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default HomeScreen;