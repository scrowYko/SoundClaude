import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.dbname, //nome do db
  process.env.dbusername, //usuario
  process.env.dbpassword, //senha
  {
    host: process.env.dbhost, //endereço
    port: process.env.dbport, //porta
    dialect: "postgres", //banco usado
  }
);

const User = sequelize.define("user", {
  nome: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  sobrenome: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dataNascimento: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.DataTypes.ENUM("ativo", "inativo"),
    allowNull: false,
    defaultValue: "inativo",
  },
  imagem_perfil: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
});

const criarTabelas = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("conectou");
    })
    .catch((err) => {
      console.log(err);
    });
  sequelize.sync({ force: true }).then(() => {
    console.log("tabela criada");
  });
};

export { User, sequelize, criarTabelas };
