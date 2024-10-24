import Express from "express";
import { User, criarTabelas } from "./db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from 'cors'

const app = Express();
app.use(Express.json());
app.use(cors())

const verificarTabelaUser = async () => {
  try {
    const result = await User.findOne();
    if (result) {
      console.log('Tabela "user" existe');
      return true;
    } else {
      console.log('Tabela "user" não existe');
      criarTabelas();
      return false;
    }
  } catch (error) {
    console.log('Erro ao verificar tabela "user"');
    return false;
  }
};

//verificarTabelaUser()

app.post("/registro", async function (req, res) {
  //get infos from body
  try {
    const { nome, sobrenome, dataNascimento, email, senha } = req.body;
    //verify if the fields are valid
    if (!nome || !sobrenome || !dataNascimento || !email || !senha) {
      return res.status(406).send({ message: "Preencha todos os campos" });
    }
    //veridy if the user already exists
    if (await User.findOne({ where: { email: email } })) {
      return res.status(418).send({ message: "Email já cadastrado" });
    }
    //encrypt password
    const senhaCriptografada = bcryptjs.hashSync(senha, 10);

    //create user in database
    let novoUsuario = User.create({
      nome: nome,
      sobrenome: sobrenome,
      dataNascimento: dataNascimento,
      email: email,
      senha: senhaCriptografada,
    });
    novoUsuario.save(); //Save user in database
    return res.status(201).send({ message: "Usuário criado" });
  } catch (error) {
    return res
      .status(error)
      .send({ message: "Erro ao conectar com banco de dados" });
  }
});

app.post("/login", async function (req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      //verify if  the fields are valid
      return res.status(406).send({ message: "Preencha todos os campos" });
    }
    const usuario = await User.findOne({ where: { email: email } }); //get user from db and verify if exists
    if (!usuario) {
      return res.status(404).send({ message: "Email não encontrado" }); //returns 404 if user not found
    }
    if (!bcryptjs.compareSync(senha, usuario.senha)) {
      //compare password
      res.status(400).send("Senha incorreta");
    }
    //create jwt token
    const token = jwt.sign({ nome: usuario.nome, email: usuario.email, status: usuario.status }, //payload of jwt
         'chavecriptografiasupersegura', 
         {
      expiresIn: "7d",
    });
    //devolver resposta com o token
    return res.status(200).send({ message: 'Usuário logado com sucesso',token: token });

  } catch (error) {
    return res
      .status(error)
      .send({ message: "Erro ao conectar com banco de dados" });
  }
});

app.listen(8000);
