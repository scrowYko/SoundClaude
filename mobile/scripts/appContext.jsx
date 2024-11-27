import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser ] = useState(null); // Armazena as informações do usuário
  const [userLogged, setUserLogged] = useState(false); // Estado para verificar se o usuário está logado

  // Função para atualizar as informações do usuário ao logar
  const updateUser  = (userInfo) => {
    setUser (userInfo);
    setUserLogged(true);
  };

  // Função para deslogar o usuário
  const logoutUser  = () => {
    setUser (null);
    setUserLogged(false);
  };

  return (
    <AppContext.Provider value={{ user, userLogged, updateUser , logoutUser  }}>
      {children}
    </AppContext.Provider>
  );
};