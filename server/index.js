import Express from "express";
import { User, criarTabelas } from "./db.js";
import bcryptjs from 'bcryptjs'
 

const app = Express()
app.use(Express.json())


const verificarTabelaUser = async () => {
    try {
        const result = await User.findOne();
        if (result) {
            console.log('Tabela "user" existe');
            return true;
        } else {
            console.log('Tabela "user" não existe');
            criarTabelas() 
            return false;
        }
    } catch (error) {
        console.log('Erro ao verificar tabela "user"');
        return false;
    }
};

//verificarTabelaUser()

app.post('/registro', async function(req, res) {
    console.log(req.body)
    //get infos from body
    try {
        const { nome, sobrenome, dataNascimento, email, senha  } = req.body
    //verify if the fields are valid
        if(!nome || !sobrenome || !dataNascimento || !email || !senha){
            return res.status(406).send({ message: 'Preencha todos os campos' })
        }
        //veridy if the user already exists
        if( await User.findOne({where:{email: email}})){
            return res.status(418).send({ message: 'Email já cadastrado' })
        }
        //encrypt password
        const  senhaCriptografada = bcryptjs.hashSync(senha, 10)

    //create user in database  
        let novoUsuario = User.create({
            nome: nome,
            sobrenome: sobrenome,
            dataNascimento: dataNascimento,
            email: email,
            senha:  senhaCriptografada
        })
        novoUsuario.save()
        return res.status(201).send({message: 'Usuário criado'})
    } catch (error) {
        return res.status(error).send({message: 'Erro ao conectar com banco de dados'})
    }
    
    //encrypt  the password
     
    //response to client
})



app.listen(8000);
